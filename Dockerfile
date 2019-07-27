FROM node:12.2.0-alpine as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json /app/package.json
RUN npm install --only=dev
RUN npm install --silent
COPY . /app
RUN npm run build

# production environment
FROM node:12.2.0-alpine
COPY --from=build /app/build /usr/app
RUN npm config set unsafe-perm true
RUN npm install -g serve
EXPOSE 3000
CMD [ "serve", "-s", "/usr/app", "-l", "3000"]