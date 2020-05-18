FROM node:13.14-alpine3.11
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 1337

CMD ["npm", "run", "start:dev"]
