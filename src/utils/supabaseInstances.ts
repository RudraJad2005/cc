export interface SupabaseInstance {
  id: string;
  name: string;
  url: string;
  key: string;
}

export function getSupabaseInstances(): SupabaseInstance[] {
  try {
    const data = localStorage.getItem('supabaseInstances');
    return data ? JSON.parse(data) : [];
  } catch (e) {
    return [];
  }
}

export function saveSupabaseInstances(instances: SupabaseInstance[]) {
  localStorage.setItem('supabaseInstances', JSON.stringify(instances));
}

export function addSupabaseInstance(name: string, url: string, key: string): SupabaseInstance {
  const instances = getSupabaseInstances();
  const newInstance: SupabaseInstance = {
    id: crypto.randomUUID(),
    name,
    url,
    key,
  };
  instances.push(newInstance);
  saveSupabaseInstances(instances);
  return newInstance;
}

export function removeSupabaseInstance(id: string) {
  const instances = getSupabaseInstances();
  saveSupabaseInstances(instances.filter(i => i.id !== id));
}

export function getActiveInstanceId(): string | null {
  return localStorage.getItem('activeSupabaseInstance');
}

export function setActiveInstanceId(id: string | null) {
  if (id) {
    localStorage.setItem('activeSupabaseInstance', id);
  } else {
    localStorage.removeItem('activeSupabaseInstance');
  }
}

export function getActiveInstance(): SupabaseInstance | null {
  const activeId = getActiveInstanceId();
  if (!activeId) return null;
  const instances = getSupabaseInstances();
  return instances.find(i => i.id === activeId) || null;
}

export function migrateLegacyInstance() {
  // If the user has a single legacy instance stored in supabaseUrl/supabaseKey, migrate it.
  const legacyUrl = localStorage.getItem('supabaseUrl');
  const legacyKey = localStorage.getItem('supabaseKey');
  if (legacyUrl && legacyKey) {
    const instances = getSupabaseInstances();
    if (instances.length === 0) {
      const migrated = addSupabaseInstance('Default Project', legacyUrl, legacyKey);
      setActiveInstanceId(migrated.id);
    }
    // Clean up legacy keys
    localStorage.removeItem('supabaseUrl');
    localStorage.removeItem('supabaseKey');
  }
}
