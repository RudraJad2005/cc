import { useEffect, useRef, useState } from 'react';
import * as Y from 'yjs';
import * as awarenessProtocol from 'y-protocols/awareness';
import { supabase } from '../lib/supabase';

export function useCollab(projectId: string | undefined) {
  const [ydoc, setYdoc] = useState<Y.Doc | null>(null);
  const [provider, setProvider] = useState<{ awareness: awarenessProtocol.Awareness } | null>(null);

  useEffect(() => {
    if (!projectId) return;

    const doc = new Y.Doc();
    const awareness = new awarenessProtocol.Awareness(doc);

    // Generate random color for this user
    const color = '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
    awareness.setLocalStateField('user', {
      name: `User ${Math.floor(Math.random() * 1000)}`,
      color: color
    });

    const channel = supabase.channel(`collab-code-${projectId}`);

    // 1. When local doc changes, broadcast update
    doc.on('update', (update, origin) => {
      if (origin !== 'remote') {
        channel.send({
          type: 'broadcast',
          event: 'update',
          payload: { update: Array.from(update) }
        });
      }
    });

    // 2. When local awareness changes, broadcast awareness
    awareness.on('update', ({ added, updated, removed }, origin) => {
      if (origin !== 'remote') {
        const changedClients = added.concat(updated, removed);
        const encode = awarenessProtocol.encodeAwarenessUpdate(awareness, changedClients);
        channel.send({
          type: 'broadcast',
          event: 'awareness',
          payload: { update: Array.from(encode) }
        });
      }

      // Hack to inject the user's name label onto the y-monaco cursor element
      setTimeout(() => {
        const states = Array.from(awareness.getStates().values());
        const heads = document.querySelectorAll('.yRemoteSelectionHead');
        heads.forEach((head: any) => {
          const color = head.style.borderColor;
          const user = states.find((s: any) => s.user?.color === color)?.user;
          if (user && !head.querySelector('.cursor-name')) {
            const nameDiv = document.createElement('div');
            nameDiv.className = 'cursor-name';
            nameDiv.textContent = user.name;
            nameDiv.style.backgroundColor = color;
            nameDiv.style.color = '#fff';
            nameDiv.style.position = 'absolute';
            nameDiv.style.top = '-18px';
            nameDiv.style.left = '-2px';
            nameDiv.style.fontSize = '11px';
            nameDiv.style.padding = '2px 6px';
            nameDiv.style.borderRadius = '4px';
            nameDiv.style.whiteSpace = 'nowrap';
            nameDiv.style.zIndex = '100';
            nameDiv.style.pointerEvents = 'none';
            nameDiv.style.boxShadow = '0 2px 4px rgba(0,0,0,0.2)';
            head.appendChild(nameDiv);
          }
        });
      }, 50);
    });

    // 3. Handle incoming remote updates
    channel.on('broadcast', { event: 'update' }, ({ payload }) => {
      Y.applyUpdate(doc, new Uint8Array(payload.update), 'remote');
    });

    // 4. Handle incoming remote awareness
    channel.on('broadcast', { event: 'awareness' }, ({ payload }) => {
      awarenessProtocol.applyAwarenessUpdate(awareness, new Uint8Array(payload.update), 'remote');
    });

    // 5. Handle sync requests from new peers
    channel.on('broadcast', { event: 'request_sync' }, ({ payload }) => {
      const update = Y.encodeStateAsUpdate(doc, new Uint8Array(payload.stateVector));
      channel.send({
        type: 'broadcast',
        event: 'update',
        payload: { update: Array.from(update) }
      });
      const encode = awarenessProtocol.encodeAwarenessUpdate(awareness, Array.from(awareness.getStates().keys()));
      channel.send({
        type: 'broadcast',
        event: 'awareness',
        payload: { update: Array.from(encode) }
      });
    });

    // 6. When we successfully subscribe, ask peers for the current state
    channel.subscribe((status) => {
      if (status === 'SUBSCRIBED') {
        const stateVector = Y.encodeStateVector(doc);
        channel.send({
          type: 'broadcast',
          event: 'request_sync',
          payload: { stateVector: Array.from(stateVector) }
        });
      }
    });

    // 7. Cleanup ghost cursors (Ping & Timeout system)
    const pingInterval = setInterval(() => {
      if (awareness.getLocalState() !== null) {
        const encode = awarenessProtocol.encodeAwarenessUpdate(awareness, [doc.clientID]);
        channel.send({ type: 'broadcast', event: 'awareness', payload: { update: Array.from(encode) } });
      }
    }, 15000);

    const cleanupInterval = setInterval(() => {
      const now = Date.now();
      const toRemove: number[] = [];
      awareness.meta.forEach((meta, clientID) => {
        if (clientID !== doc.clientID && now - meta.lastUpdated > 35000) {
          toRemove.push(clientID);
        }
      });
      if (toRemove.length > 0) {
        awarenessProtocol.removeAwarenessStates(awareness, toRemove, 'local');
      }
    }, 10000);

    const handleBeforeUnload = () => {
      awarenessProtocol.removeAwarenessStates(awareness, [doc.clientID], 'local');
    };
    window.addEventListener('beforeunload', handleBeforeUnload);

    setYdoc(doc);
    setProvider({ awareness });

    return () => {
      clearInterval(pingInterval);
      clearInterval(cleanupInterval);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      channel.unsubscribe();
      awareness.destroy();
      doc.destroy();
    };
  }, [projectId]);

  return { ydoc, provider };
}
