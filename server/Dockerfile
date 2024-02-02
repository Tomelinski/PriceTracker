FROM node:18-alpine

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package*.json ./
RUN npm ci
RUN npm install -g nodemon

EXPOSE 8000

# start app
# CMD ["npm", "start"]
CMD ["nodemon", "index.js"]
