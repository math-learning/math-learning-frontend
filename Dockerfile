FROM node:12.2.0-alpine

ENV PATH /usr/src/app/node_modules/.bin:$PATH
ADD ./ /usr/src/app
WORKDIR /usr/src/app

RUN npm install --only=dev
RUN npm install --silent

EXPOSE 3000

CMD [ "npm", "start"]