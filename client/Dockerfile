FROM node:20.10.0

RUN npm install -g pnpm@8.15.5

WORKDIR /front

COPY scripts/entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/entrypoint.sh

COPY package*.json ./

RUN pnpm install

COPY . .

RUN pnpm build

ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]

CMD ["pnpm", "start"]
