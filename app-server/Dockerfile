FROM node:14.2.0-alpine3.11 as server_build
WORKDIR /usr/src/app
COPY package*.json ./

RUN npm install
COPY . .
EXPOSE 8080
CMD [ "node", "server.js" ]