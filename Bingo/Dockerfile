FROM node:14.2.0-alpine3.11 as angular_build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build


FROM nginx:alpine
VOLUME /var/cache/nginx
COPY --from=node /app/dist/app /usr/share/nginx/html

EXPOSE 80