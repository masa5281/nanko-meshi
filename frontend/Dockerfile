FROM node:23.7.0
RUN apt update -qq && apt install -y vim

WORKDIR /app

RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN apt update && apt install -y yarn

COPY package.json yarn.lock ./
RUN yarn install

COPY . .

ENV DISABLE_ESLINT_PLUGIN=true
RUN yarn build
EXPOSE 3001
