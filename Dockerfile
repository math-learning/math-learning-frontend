FROM node:12.2.0-alpine as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json /app/package.json
RUN npm install --silent
RUN npm install react-scripts@3.0.1 -g --silent --only=dev
COPY . /app
RUN npm run build

# production environment
FROM node:12.2.0-alpine
COPY --from=build /app/build /usr/app
RUN npm install -g serve
EXPOSE 3000
CMD [ "serve", "-s", "/usr/app", "-l", "3000"]