FROM node:20.10.0

RUN npm install -g pnpm@8.15.5

WORKDIR /back

COPY package*.json ./

RUN pnpm install

COPY . .

RUN chmod +x /back/scripts/entrypoint.sh

ENTRYPOINT ["/back/scripts/entrypoint.sh"]

CMD ["pnpm", "start"]
