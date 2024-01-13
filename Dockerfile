FROM node:18.17.0

WORKDIR /var/www/temperature_app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "node", "app.ts" ]