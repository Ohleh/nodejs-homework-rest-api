FROM node

WORKDIR /projectdock 

COPY . .

RUN npm install

EXPOSE 3000

CMD npm run start:dev