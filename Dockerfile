# Multi-stage build for Next.js Micro Frontend with Root Context
FROM node:20-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copy package.json files
COPY neocentra-bank-host/package.json neocentra-bank-host/package-lock.json ./neocentra-bank-host/
WORKDIR /app/neocentra-bank-host
RUN npm install

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app

# Copy dependency node_modules
COPY --from=deps /app/neocentra-bank-host/node_modules ./neocentra-bank-host/node_modules

# Copy source code of MFE and the shared dependency
COPY neocentra-bank-shared ./neocentra-bank-shared
COPY neocentra-bank-auth ./neocentra-bank-auth
COPY neocentra-bank-dashboard ./neocentra-bank-dashboard
COPY neocentra-bank-layout ./neocentra-bank-layout
COPY neocentra-bank-host ./neocentra-bank-host

# Install shared MFE dependencies so webpack resolver can compile aliased files
WORKDIR /app/neocentra-bank-shared
RUN npm install

ENV NODE_ENV=production
ENV NEXT_PRIVATE_LOCAL_WEBPACK=true

# Bake production environment variables during build time for Next.js bundle compilation
ENV NEXT_PUBLIC_SHARED_URL=/mf-shared
ENV NEXT_PUBLIC_AUTH_URL=/mf-auth
ENV NEXT_PUBLIC_DASHBOARD_URL=/mf-dashboard
ENV NEXT_PUBLIC_LAYOUT_URL=/mf-layout
ENV NEXT_PUBLIC_HOST_API_URL=https://neocentra.bank.com

WORKDIR /app/neocentra-bank-host
RUN npm run build

# Production runner image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_PRIVATE_LOCAL_WEBPACK=true
ENV PORT 3341
ENV HOSTNAME "0.0.0.0"

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy shared folder and sibling MFE folders since they are referenced statically in next.config.js for server resolution
COPY --from=builder /app/neocentra-bank-shared ./neocentra-bank-shared
COPY --from=builder /app/neocentra-bank-auth ./neocentra-bank-auth
COPY --from=builder /app/neocentra-bank-dashboard ./neocentra-bank-dashboard
COPY --from=builder /app/neocentra-bank-layout ./neocentra-bank-layout

# Copy MFE files
WORKDIR /app/neocentra-bank-host
COPY --from=builder /app/neocentra-bank-host/public ./public
COPY --from=builder /app/neocentra-bank-host/package.json ./package.json
COPY --from=builder /app/neocentra-bank-host/next.config.js ./next.config.js
COPY --from=builder --chown=nextjs:nodejs /app/neocentra-bank-host/.next ./.next
COPY --from=builder --chown=nextjs:nodejs /app/neocentra-bank-host/node_modules ./node_modules

USER nextjs

EXPOSE 3341

CMD ["npm", "run", "start"]
