#!/bin/sh

if [ ! -f /app/secrets/next_auth_secret ]; then
  echo "Generating Next auth secret key..."
  openssl rand -base64 64 > /app/secrets/next_auth_secret
fi

export NEXTAUTH_SECRET=$(cat /app/secrets/next_auth_secret)

exec "$@"
