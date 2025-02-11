FROM --platform=linux/amd64 ruby:3.4.1
RUN apt update -qq && apt install -y postgresql-client tzdata

WORKDIR /app

COPY Gemfile /app/Gemfile
COPY Gemfile.lock /app/Gemfile.lock
RUN gem install bundler
RUN bundle install

COPY . /app

COPY entrypoint.sh /usr/bin/
# entrypoint.shを実行する
RUN chmod +x /usr/bin/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]

# Railsサーバーの起動
EXPOSE 3000

CMD ["rails", "server", "-b", "0.0.0.0"]
