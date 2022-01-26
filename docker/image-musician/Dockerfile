FROM node:alpine
WORKDIR /opt/app
COPY /src/ ./
RUN npm install --prefix ./musician
ENTRYPOINT [ "node", "/opt/app/musician/index.js" ]