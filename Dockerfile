FROM node:15.3.0
COPY ./package.json .
COPY ./yarn.lock .
COPY ./packages/client/package.json ./packages/client/
COPY ./packages/common/package.json ./packages/common/
COPY ./packages/server/package.json ./packages/server/
COPY . .


RUN yarn
RUN yarn run build
RUN yarn run copy

EXPOSE 80
ENV PORT 80

ENV NODE_ENV "production"

CMD ["yarn", "start:serve"]
FROM node:15.3.0
COPY ./package.json .
COPY ./yarn.lock .
COPY ./packages/client/package.json ./packages/client/
COPY ./packages/common/package.json ./packages/common/
COPY ./packages/server/package.json ./packages/server/
COPY . .


RUN yarn
RUN yarn run build
RUN yarn run copy

EXPOSE 80
ENV PORT 80

ENV NODE_ENV "production"

CMD ["yarn", "start:serve"]
