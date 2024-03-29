FROM node:18-alpine

RUN mkdir -p /app

WORKDIR /app

COPY package*.json ./

RUN npm cache clean --force && rm -rf node_modules

RUN npm install

COPY . .

EXPOSE 5000

CMD ["yarn", "dev"]