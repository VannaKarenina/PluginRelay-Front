FROM node:18-alpine3.17 as build

WORKDIR /app

COPY . /app

RUN npm ci && npx nuxt build

FROM node:18-alpine3.17

RUN apk update && apk upgrade && apk add dumb-init

WORKDIR /app

COPY --from=build /app/.output ./

EXPOSE 3000

ENV HOST=0.0.0.0 PORT=3000 NODE_ENV=production

CMD ["dumb-init","node","/app/server/index.mjs"]
