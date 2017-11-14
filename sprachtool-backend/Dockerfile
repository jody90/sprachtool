FROM node:6

# Create a directory where our app will be placed
RUN mkdir -p /usr/src/app

# Change directory so that our commands run inside this new directory
WORKDIR /usr/src/app

# For npm@5 or later, copy package-lock.json as well
COPY package.json package-lock.json /usr/src/app/

RUN npm install

# Get all the code needed to run the app
COPY . /usr/src/app

EXPOSE 5000

# CMD [ "npm", "start" ]
