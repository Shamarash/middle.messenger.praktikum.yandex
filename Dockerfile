FROM ubuntu:latest
RUN apt update && apt install -y nodejs && apt install -y npm
CMD node -v
WORKDIR /var/www
COPY ./simpleServer.js simpleServer.js
EXPOSE 3000
CMD node simpleServer.js