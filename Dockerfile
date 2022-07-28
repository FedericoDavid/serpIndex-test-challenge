FROM node:18 as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
COPY package-lock.json ./

RUN npm i
COPY . ./
RUN npm run build

FROM nginx:1.23
COPY --from=build /app/dist/ /usr/share/nginx/html

