# Usa a imagem oficial do Node.js versão 20
FROM node:20

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia apenas os arquivos necessários para instalar as dependências
COPY package.json package-lock.json ./

# Instala as dependências em um ambiente otimizado
RUN npm install --production

# Copia o restante do código
COPY . .

# Expõe a porta 3000 para comunicação
EXPOSE 3000

# Comando para rodar a aplicação
CMD [ "npm", "run", "start" ]
