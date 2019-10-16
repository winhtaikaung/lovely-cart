FROM node:10.15.3

LABEL maintainer "winhtaikaung28@hotmail.com"

RUN mkdir /app
WORKDIR /app

ADD package.json /tmp
RUN cd /tmp && npm install

RUN mv /tmp/node_modules /app

COPY . /app

RUN npm run build

RUN mv ./build/index.html ./build/index.ejs

RUN sed -i 's/% REACT_APP_API_URL %/"<%= REACT_APP_API_URL %>";/g' ./build/index.ejs

EXPOSE 3000

CMD ["node", "server.js"]
