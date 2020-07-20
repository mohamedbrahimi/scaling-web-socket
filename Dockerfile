FROM node:13
WORKDIR /home/node/app
COPY ./ ./
COPY app/package*.json ./

#build this image as "docker build -t wsapp ."