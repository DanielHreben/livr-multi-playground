FROM ubuntu

RUN apt-get update
RUN apt-get -y install python3-minimal python3-pip
RUN apt-get -y install erlang rebar
RUN apt-get -y install nodejs nodejs-legacy npm
RUN apt-get -y install php-cli composer
RUN apt-get -y install perl carton
RUN apt-get -y install ruby bundler
RUN apt-get -y install nginx

COPY nginx.conf /etc/nginx/sites-enabled/playground.conf

ENV home /home/playground
ENV app ${home}/livr-multi-playground

RUN useradd -ms /bin/bash playground

COPY ./ ${app}
RUN chown -R playground:playground ${app}

USER playground
WORKDIR ${home}

RUN mkdir .ssh && touch .ssh/known_hosts && ssh-keyscan -H github.com >> .ssh/known_hosts && chmod 600 .ssh/known_hosts

WORKDIR ${app}/server
RUN cp etc/config.sample.json etc/config.json
RUN npm i

WORKDIR ${app}/client
RUN cp public/static/config.js.sample public/static/config.js
RUN npm i
RUN npm run build

WORKDIR ${app}/implementations/JavaScript
RUN npm i

WORKDIR ${app}/implementations/Erlang
RUN rebar get-deps 
RUN rebar compile

WORKDIR ${app}/server
CMD npm start
