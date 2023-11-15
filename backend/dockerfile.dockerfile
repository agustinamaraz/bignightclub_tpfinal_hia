FROM node:18.16.0

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

RUN npm uninstall bcrypt

RUN npm install bcrypt

CMD ["npm", "start"]