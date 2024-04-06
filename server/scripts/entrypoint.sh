#!/bin/bash

mkdir -p /secrets

if [ ! -f /secrets/jwt_secret_key ]; then
  echo "Generating JWT secret key..."
  openssl rand -base64 32 > /secrets/jwt_secret_key
fi

if [ ! -f /secrets/jwt_refresh_key ]; then
  echo "Generating JWT refresh key..."
  openssl rand -base64 32 > /secrets/jwt_refresh_key
fi

export JWT_SECRET_KEY=$(cat /secrets/jwt_secret_key)
export JWT_REFRESH_TOKEN_KEY=$(cat /secrets/jwt_refresh_key)

pnpm prisma migrate deploy
pnpm prisma generate
pnpm build

exec "$@"
