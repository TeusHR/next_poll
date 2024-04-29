FROM node:18-alpine AS base

RUN apk add --no-cache libc6-compat openssl

WORKDIR /app
COPY package.json ./
RUN corepack enable pnpm && pnpm i --no-frozen-lockfile

COPY . .

FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nestjs
RUN adduser --system --uid 1001 nestjs

RUN mkdir -p /app/secrets && chown -R nestjs:nestjs /app/secrets

COPY --from=base /app ./
COPY ./scripts/entrypoint.sh /app/scripts/entrypoint.sh
RUN chmod +x /app/scripts/entrypoint.sh

RUN chown -R nestjs:nestjs /app

USER nestjs

EXPOSE 4000

CMD ["/app/scripts/entrypoint.sh"]
