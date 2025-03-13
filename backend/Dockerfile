# Usa a imagem oficial do Node.js como base
FROM node:18-alpine  

# Define o diretório de trabalho dentro do container
WORKDIR /app  

# Copia o package.json e package-lock.json antes de copiar o código
# Isso melhora a eficiência do cache do Docker
COPY package*.json ./  

# Instala as dependências do projeto
RUN npm install  

# Copia todo o código do projeto para dentro do container
COPY . .  

# Expõe a porta que a aplicação usará
EXPOSE 3000  

# Define o comando para rodar o backend
CMD ["npm", "start"]
