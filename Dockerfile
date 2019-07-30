FROM node:10.15.3 as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json /app/package.json
RUN npm install --only=dev
RUN npm install --silent
COPY . /app
RUN npm run build

# production environment
FROM node:10.15.3
COPY --from=build /app/build /usr/app
RUN npm config set unsafe-perm true
RUN npm install -g serve
CMD ["serve", "-s", "/usr/app"]