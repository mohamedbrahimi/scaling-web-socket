FROM node:13
WORKDIR /home/node/app
COPY ./ ./
COPY app/package*.json ./

RUN npm i npm@latest -g
RUN npm i
ENV REDIS_URL=rds
RUN npm install pm2 -g

#ENTRYPOINT [ "pm2-runtime", "pm2.config.json", "--only" ]
CMD ["pm2-runtime", "start", "pm2.config.json"]
#build this image as "docker build -t wsapp ."
