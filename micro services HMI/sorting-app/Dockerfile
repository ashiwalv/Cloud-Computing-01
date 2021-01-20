FROM node:12

WORKDIR /opt

COPY package*.json ./

RUN npm install

RUN npm update

COPY . .

RUN ls -lsa 

EXPOSE 8080

RUN npm -v

CMD ["npm", "run" ,"serve"]