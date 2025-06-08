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
# GitHub Actionsで設定した環境変数を利用
ARG REACT_APP_API_URL
ARG REACT_APP_BASE_URL
ARG REACT_APP_FIREBASE_API_KEY
ARG REACT_APP_FIREBASE_AUTH_DOMAIN
ARG REACT_APP_FIREBASE_PROJECT_ID
ARG REACT_APP_FIREBASE_STORAGE_BUCKET
ARG REACT_APP_FIREBASE_MESSAGE_SENDER_ID
ARG REACT_APP_FIREBASE_APP_ID

ENV REACT_APP_API_URL=$REACT_APP_API_URL
ENV REACT_APP_BASE_URL=$REACT_APP_BASE_URL
ENV REACT_APP_FIREBASE_API_KEY=$REACT_APP_FIREBASE_API_KEY
ENV REACT_APP_FIREBASE_AUTH_DOMAIN=$REACT_APP_FIREBASE_AUTH_DOMAIN
ENV REACT_APP_FIREBASE_PROJECT_ID=$REACT_APP_FIREBASE_PROJECT_ID
ENV REACT_APP_FIREBASE_STORAGE_BUCKET=$REACT_APP_FIREBASE_STORAGE_BUCKET
ENV REACT_APP_FIREBASE_MESSAGE_SENDER_ID=$REACT_APP_FIREBASE_MESSAGE_SENDER_ID
ENV REACT_APP_FIREBASE_APP_ID=$REACT_APP_FIREBASE_APP_ID
RUN yarn build

# 本番用
FROM nginx:stable-alpine AS production
COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
