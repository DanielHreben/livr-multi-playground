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

COPY ./client ${app}/client
RUN chown -R playground:playground ${app}/client
USER playground
WORKDIR ${app}/client
RUN cp public/static/config.js.sample public/static/config.js
RUN npm i
RUN npm run build

USER root
COPY ./server ${app}/server
RUN chown -R playground:playground ${app}/server
USER playground
WORKDIR ${app}/server
RUN cp etc/config.sample.json etc/config.json
RUN npm i

USER root
RUN apt-get install dos2unix
USER playground

USER root
COPY ./implementations ${app}/implementations 
RUN chown -R playground:playground ${app}/implementations
USER playground


WORKDIR ${app}/implementations/JavaScript
RUN dos2unix ./*
RUN npm i

WORKDIR ${app}/implementations/Erlang
RUN dos2unix ./*
RUN rebar get-deps 
RUN rebar compile

WORKDIR ${app}/implementations/PHP
RUN dos2unix ./*
RUN composer install

WORKDIR ${app}/implementations/Perl
RUN dos2unix ./*
RUN carton install

WORKDIR ${app}/implementations/Python
RUN dos2unix ./*
RUN pip3 install -r requirements.txt

WORKDIR ${app}/implementations/Ruby
RUN dos2unix ./*
RUN bundler install --path .

USER root
CMD service nginx start && su - playground -c "cd ${app}/server; npm start" 

#USER root
#COPY unit /etc/systemd/system/playground.service
#RUN chmod -x /etc/systemd/system/playground.service
#RUN systemctl enable playground

