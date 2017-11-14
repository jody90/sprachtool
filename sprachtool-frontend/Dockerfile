### STAGE 1: Build ###

# We label our stage as 'builder'
FROM node:6 as builder

ARG BUILD_SETTINGS
RUN echo $BUILD_SETTINGS

COPY package.json package-lock.json ./

RUN npm set progress=false && npm config set depth 0 && npm cache clean --force

## Storing node modules on a separate layer will prevent unnecessary npm installs at each build
RUN npm i && mkdir /ng-app && cp -R ./node_modules ./ng-app

WORKDIR /ng-app

COPY . .

#RUN echo $BUILD_SETTINGS

## Build the angular app in production mode and store the artifacts in dist folder
RUN $(npm bin)/ng build $BUILD_SETTINGS


### STAGE 2: Setup ###

FROM nginx:latest

## Copy our default nginx config
COPY ./nginx/default.conf /etc/nginx/conf.d/

## Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

## From 'builder' stage copy over the artifacts in dist folder to default nginx public folder
COPY --from=builder /ng-app/dist /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]
