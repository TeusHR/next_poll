FROM node:20-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
ENV NEXT_TELEMETRY_DISABLED=1

RUN corepack enable

FROM base AS builder
RUN apk add --no-cache libc6-compat openssl

COPY ./client /front/client
COPY pnpm-workspace.yaml .npmrc package.json pnpm-lock.yaml /front/
COPY .env /front/client
WORKDIR /front/

RUN mkdir -p /front/secrets
RUN openssl rand -base64 64 > /front/secrets/next_auth_secret

RUN pnpm install --frozen-lockfile
RUN pnpm run --filter=client -r build

FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN apk add --no-cache curl

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder --chown=nextjs:nodejs /front/client/public ./client/public
COPY --from=builder --chown=nextjs:nodejs /front/secrets/ /app/secrets
COPY --from=builder --chown=nextjs:nodejs /front/client/.next/standalone /app
COPY --from=builder --chown=nextjs:nodejs /front/client/.next/static /app/client/.next/static
COPY --from=builder --chown=nextjs:nodejs /front/client/scripts/revalidate.sh /app/scripts/revalidate.sh

USER nextjs

EXPOSE 3000

CMD export NEXTAUTH_SECRET=$(cat /app/secrets/next_auth_secret) && \
    HOSTNAME="0.0.0.0" node /app/client/server.js & /app/scripts/revalidate.sh
