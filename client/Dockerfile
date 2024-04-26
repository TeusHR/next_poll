FROM node:20.10.0

RUN npm install -g pnpm@8.15.5

WORKDIR /front

COPY package*.json ./

RUN pnpm install

COPY . .

RUN chmod +x /front/scripts/entrypoint.sh

ENTRYPOINT ["/front/scripts/entrypoint.sh"]

CMD ["pnpm", "start"]
