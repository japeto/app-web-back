FROM node:12-slim

EXPOSE 3000

WORKDIR /usr/app

COPY . . 

RUN npm install

CMD ["npm", "start"]