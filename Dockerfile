FROM node:25.8-alpine AS builder

WORKDIR /app

COPY package*.json /.

RUN npm install

COPY . . 

RUN npm run build 

FROM nginx:1.29.6-alpine

RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80