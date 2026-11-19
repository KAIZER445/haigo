FROM node:22

RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /main/app

COPY . .

RUN pnpm install

EXPOSE 3000

CMD ["pnpm", "run", "start:dev"]

