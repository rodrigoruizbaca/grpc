FROM node:8.10.0-alpine
WORKDIR /app
COPY package.json /app
RUN npm install
COPY index.js /app
COPY ./static_codegen/ /app/static_codegen/
CMD node index.js
EXPOSE 3000

