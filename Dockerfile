# Usa a imagem oficial do Node.js versão 20
FROM node:20

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install --production

COPY . .

# Garante que o banco está acessível antes de rodar as migrações


EXPOSE 3000

CMD [ "npm", "run", "start" ]
