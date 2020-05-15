FROM node:14.2.0-alpine3.11 as angular_build
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build


FROM nginx:alpine
COPY --from=angular_build /usr/src/app/dist/Bingo /usr/share/nginx/html

EXPOSE 80