FROM node:21-alpine
WORKDIR /usr/app
COPY package.json .
RUN npm install
COPY . .
EXPOSE 2000
CMD ["npm", "start"]
