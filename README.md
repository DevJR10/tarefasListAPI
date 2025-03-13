# To Do List

API que te permite adicionar novas tarefas que você gostaria para organizar para o seu dia a dia. Você pode excluir ou edita-las.

## Tecnologias Usadas

- Node.js
- Express
- Docker
- MySQL

## Como Rodar o Projeto

Certifique-se de que você tenha o seguinte instalado:

- [Docker](https://www.docker.com/get-started) (para rodar o projeto em containers)
- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/) (caso queira rodar localmente sem Docker)

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/seu-repositorio.git

# 2. Rode o docker-compose
docker-compose up -d

#O front-end estará rodando em http://localhost:80
#O back-end estará rodando em http://localhost:3000/tasks

#Se preferir rodar sem o docker, inicie pelo Node JS diretamente
npm start

#Não esqueça de criar o banco de dados testeApi com a tabela tasks.





