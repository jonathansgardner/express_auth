FROM node:12.0.0
WORKDIR /app
COPY ./package.json ./
RUN npm install
COPY ./ ./
CMD ["npm","run","start"]
