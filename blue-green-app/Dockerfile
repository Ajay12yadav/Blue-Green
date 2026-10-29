from node:20-alpine AS builder
workdir /app
copy package.json
run npm ci --only= production

from node:20-alpine AS runner
workdir /app
copy --from=builder /app/node_modules ./node_modules
copy public ./public

env NODE_ENV=production
expose 3000

user node
cmd ["node","server.js"]