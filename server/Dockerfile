# Используем образ Node.js 20.10.0
FROM node:20.10.0

# Установка pnpm версии 8.15.5
RUN npm install -g pnpm@8.15.5

WORKDIR /back

COPY scripts/entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/entrypoint.sh

# Копирование файлов проекта
COPY package*.json ./

# Установка зависимостей через pnpm
RUN pnpm install

COPY . .

ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]

CMD ["pnpm", "start"]
