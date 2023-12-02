FROM node:20.9.0

WORKDIR /usr/src/app
COPY package*.json ./
COPY tsconfig.json ./
RUN npm install
COPY ./src ./src
EXPOSE 8080
CMD npm start