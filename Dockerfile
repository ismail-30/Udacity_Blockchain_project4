FROM node:10.16.3

USER node

RUN mkdir -p /home/node/app
WORKDIR /home/node/app

COPY --chown=node:node ./package.json ./

USER root

RUN apt-get update && apt-get install build-essential -y

RUN npm install -g node-gyp

USER node

RUN npm install
COPY --chown=node:node ./ ./


CMD ["npm", "run", "dapp"]

