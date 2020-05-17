FROM node:13.14-alpine3.11 as build

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --quiet

COPY . .

EXPOSE 3000

CMD ["npm", "start"]