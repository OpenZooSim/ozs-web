FROM node:20-alpine

WORKDIR /opt/vt-api

COPY . .

RUN apk update && apk upgrade

RUN npm ci && npm run build && npm prune --production

RUN rm -rf ./src .env .env.example .prettierrc README.md tsconfig.json Dockerfile .idea

ENTRYPOINT ["npm", "run", "serve:prod"]