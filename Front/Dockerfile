FROM node:9.6.1

#ENV PATH /usr/src/app/node_modules/.bin:$PATH

COPY package.json package.json
COPY ./src ./src
COPY ./public ./public

RUN npm install --silent
RUN npm install react-scripts@1.1.1 -g --silent

CMD ["npm", "start"]