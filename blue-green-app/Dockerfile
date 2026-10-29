# Multi-stage build for lightweight final image
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install --omit=dev

FROM node:20-alpine AS runner
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY server.js package.json ./
COPY public ./public

ENV NODE_ENV=production
EXPOSE 3000

USER node
CMD ["node", "server.js"]