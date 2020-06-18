FROM node:12-alpine

WORKDIR /app

COPY package.json /app

COPY package-lock.json /app

RUN npm install

RUN npm install react-router-dom

EXPOSE 3000

CMD ["npm", "start"]