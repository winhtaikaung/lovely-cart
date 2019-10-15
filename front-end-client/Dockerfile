FROM node:10.15.3

LABEL maintainer "winhtaikaung28@hotmail.com"

RUN mkdir /app
WORKDIR /app

ADD package.json /tmp
RUN cd /tmp && npm install

RUN mv /tmp/node_modules /app

COPY . /app

RUN npm run build
EXPOSE 3000

CMD ["./node_modules/serve/bin/serve.js", "./build" ,"-p" ,"3000"]
