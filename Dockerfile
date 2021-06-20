FROM node:latest as angular
WORKDIR /app
COPY package.json /app
RUN npm install --silent
COPY . .
RUN npm run build

FROM nginx:alpine
VOLUME /var/cache/nginx
COPY --from=angular app/dist/visionnaire-front-end /usr/share/nginx/html
COPY ./config/nginx.conf /etc/nginx/conf.d/default.conf

FROM debian:10-slim
ENV tmp_dir /tmp
RUN apt-get update \
  && apt-get install -y curl \
  && curl -sL https://deb.nodesource.com/setup_12.x | bash - \
  && apt-get install -y nodejs
RUN npm install -g json-server
RUN echo '{"clients":[], "policies": []}'
ENTRYPOINT [ "json-server", "--port", "3000", "--host", "0.0.0.0" ]
CMD ["/tmp/test.json"]
