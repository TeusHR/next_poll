ARG CLIENT_URL
ARG BACKEND_URL

FROM node:18-alpine AS base

FROM base AS deps
RUN apk add --no-cache libc6-compat

WORKDIR /app

COPY package.json  ./
RUN corepack enable pnpm && pnpm i --no-frozen-lockfile


FROM base AS builder
RUN apk add --no-cache openssl

WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED 1
ENV NEXT_PUBLIC_CLIENT_URL ${CLIENT_URL}
ENV LOCAL_BACKEND_URL ${BACKEND_URL}

RUN corepack enable pnpm && pnpm run build

RUN mkdir -p /app/secrets
RUN openssl rand -base64 64 > /app/secrets/next_auth_secret

FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder /app/secrets /app/secrets

RUN mkdir .next
RUN chown nextjs:nodejs .next

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

CMD export NEXTAUTH_SECRET=$(cat /app/secrets/next_auth_secret) && \
    HOSTNAME="0.0.0.0" node server.js
