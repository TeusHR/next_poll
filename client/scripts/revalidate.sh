#!/bin/sh

if [ -z "$NEXT_PUBLIC_CLIENT_URL" ]; then
  echo "NEXT_PUBLIC_CLIENT_URL is not set. Defaulting to http://localhost:3000"
  NEXT_PUBLIC_CLIENT_URL="http://localhost:3000"
fi

# shellcheck disable=SC2091
until $(curl --output /dev/null --silent --head --fail http://localhost:3000); do
  printf '.'
  sleep 5
done

echo "Revalidate all cache tags..."
response=$(curl -s -o /dev/null -w "%{http_code}" "$NEXT_PUBLIC_CLIENT_URL/api/revalidate")

if [ "$response" -eq 200 ]; then
  echo "Revalidate successfully completed"
else
  echo "Error during revalidate"
fi

tail -f /dev/null
