FROM ubuntu

RUN apt-get update
RUN apt-get -y install python3-minimal python3-pip
RUN apt-get -y install erlang-base rebar
RUN apt-get -y install php-cli composer
RUN apt-get -y install perl carton
RUN apt-get -y install ruby bundler
RUN apt-get -y install curl ;\
  curl -sL https://deb.nodesource.com/setup_7.x | bash ;\
  apt-get update ;\
  apt-get -y install nodejs

ENV APP /var/www/livr-multi-playground

# client
COPY ./client ${APP}/client
WORKDIR ${APP}/client
RUN cp public/static/config.js.sample public/static/config.js
RUN npm install
RUN npm run build

# server
COPY ./server ${APP}/server
WORKDIR ${APP}/server
RUN cp etc/config.sample.json etc/config.json
RUN npm install

# implementations
COPY ./implementations ${APP}/implementations

WORKDIR ${APP}/implementations/JavaScript
RUN npm install

WORKDIR ${APP}/implementations/Erlang
RUN rebar get-deps && rebar compile

WORKDIR ${APP}/implementations/PHP
RUN composer install

WORKDIR ${APP}/implementations/Perl
RUN carton install

WORKDIR ${APP}/implementations/Python
RUN pip3 install -r requirements.txt

WORKDIR ${APP}/implementations/Ruby
RUN bundler install --path .

# nginx
COPY deploy/nginx.conf /tmp/nginx.conf
RUN apt-get -y install nginx
RUN npm install -g envhandlebars
RUN chown -R www-data:www-data ${APP}/client/public/

WORKDIR ${APP}/server
CMD envhandlebars < /tmp/nginx.conf > /etc/nginx/sites-enabled/default ;\
  service nginx start ;\
  npm start


