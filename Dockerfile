FROM node:13
WORKDIR /home/node/app
COPY ./ ./
COPY app/package*.json ./
RUN npm install
CMD npm run app

#build this image as "docker build -t wsapp ."