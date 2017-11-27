FROM node:8.4.0-alpine
WORKDIR /app
# moved package first to enabled package caching in docker build step
COPY package.json .
RUN npm i
COPY . .
CMD [ "node", "bin/www" ]
