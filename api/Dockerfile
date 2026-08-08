# syntax=docker/dockerfile:1

# ---- Stage 1: install production dependencies ----
FROM node:20.17.0-alpine3.20 AS deps

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --omit=dev

# ---- Stage 2: runtime image ----
FROM node:20.17.0-alpine3.20 AS runtime

ENV NODE_ENV=production \
    PORT=3000

WORKDIR /app

# Reuse the dependencies installed in the previous stage (DRY: no re-install)
COPY --from=deps /app/node_modules ./node_modules
COPY package.json ./
COPY server.js ./
COPY controllers ./controllers
COPY routes ./routes
COPY services ./services

# The official node image already ships an unprivileged "node" user
USER node

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
    CMD node -e "fetch('http://127.0.0.1:'+(process.env.PORT||3000)+'/health').then(r=>{if(!r.ok)process.exit(1)}).catch(()=>process.exit(1))"

CMD ["node", "server.js"]
