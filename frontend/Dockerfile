# Usa a imagem oficial do Apache
FROM httpd:alpine

# Define o diretório de trabalho
WORKDIR /usr/local/apache2/htdocs/

# Copia os arquivos estáticos para o diretório do Apache
COPY . .

# Expõe a porta 80
EXPOSE 80

# Inicia o Apache
CMD ["httpd", "-D", "FOREGROUND"]
