FROM node:23.7.0 AS base
RUN apt update -qq && apt install -y vim

WORKDIR /app

RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN apt update && apt install -y yarn

COPY package.json yarn.lock ./
RUN yarn install

COPY . .

# 開発用
FROM base AS development
EXPOSE 3001
CMD [ "yarn", "start" ]

# ビルドステージ
FROM base AS builder
# ビルド時はESLintを無効化 
ENV DISABLE_ESLINT_PLUGIN=true
RUN yarn build

# 本番用
FROM nginx:stable-alpine AS production
COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
