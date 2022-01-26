FROM node:alpine
WORKDIR /opt/app
COPY /src/ ./
RUN npm install --prefix ./auditor
ENTRYPOINT [ "node", "/opt/app/auditor/index.js" ]