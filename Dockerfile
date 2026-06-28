FROM node:18-alpine AS builder

WORKDIR /app
# node-pty requires build tools on alpine
RUN apk add --no-cache python3 make g++

COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:18-alpine AS runner

WORKDIR /app

# Copy the built node_modules (which contains the compiled node-pty)
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./

# Copy the static Vite build
COPY --from=builder /app/dist ./dist

# Copy the IDE Node server
COPY --from=builder /app/server ./server

ENV NODE_ENV=production
ENV PORT=4000
EXPOSE 4000

# Start the IDE server which also serves the static frontend in production
CMD ["node", "server/index.js"]
