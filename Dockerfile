FROM node:12.13.0-alpine

WORKDIR /app

COPY . /app

RUN npm install

EXPOSE 3000

ENTRYPOINT ["node"]

CMD ["server.js"]
