#!/bin/bash
mkdir -p /secrets

if [ ! -f /secrets/next_auth_secret ]; then
  echo "Generating Next auth secret key..."
  openssl rand -base64 64 > /secrets/next_auth_secret
fi

export NEXTAUTH_SECRET=$(cat /secrets/next_auth_secret)

pnpm build

exec "$@"
