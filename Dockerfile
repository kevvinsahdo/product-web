FROM node:12.2.0 as build

WORKDIR /app

COPY . /app

RUN npm install -g @angular/cli@8.3.27

RUN npm install

RUN ng build

FROM nginx:alpine

COPY --from=build /app/dist/* /usr/share/nginx/html/