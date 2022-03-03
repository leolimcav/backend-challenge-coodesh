FROM node:16-slim

RUN apt-get update && apt-get upgrade -y && apt-get install libssl-dev -y

WORKDIR /opt/app

COPY ./package.json .

COPY ./yarn.lock .

RUN yarn

COPY . .

RUN yarn prisma generate

RUN yarn build

EXPOSE 80

CMD [ "yarn", "start:prod" ]

