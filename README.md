<p align="center">
  <a href="https://github.com/nestjs/nest" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# Descrição

## Backend - Teste técnico Warlocks Tech

### Existem 2 versões deste projeto.

Nota:

#### Este é o guia para rodar o projeto local. Caso queira rodar ele com docker, vá para a branch [PROD/DOCKER](https://github.com/Hagave/Warlocks-Tech/prod/docker)

[prod/local]() <- você está aqui

[prod/docker](https://github.com/Hagave/Warlocks-Tech/prod/docker)

## Informações importantes

Você pode fazer chamadas diretas para a api usando o postman/insomnia ou a documentação da api que está localizada [aqui](http://localhost:3000/api/docs#/)

Mas é altamente recomendável que use o frontend para fazer essas requisições.

Voce consegue baixar o [FrontEnd aqui](https://github.com/Hagave/Warlock-Tech-FE).

## PROD/LOCAL

### Pré-requisitos

Antes de rodar o projeto, você precisa instalar:

✅ [Node.js 20+](https://nodejs.org/pt/download)

✅ [PostgreSQL 15+](https://www.postgresql.org/download/)

✅ [Git](https://git-scm.com/downloads) caso queira alterar entre as branchs

##### Não precisa reinstalar caso já tenha.

## Instalação

### Windows

Durante a instalação, guarde a senha do usuário postgres.

Após a instalação, abra o pgAdmin ou use o Terminal para criar o banco de dados:

```bash
$ CREATE DATABASE warlocks_db;
```

```bash
$ netstat -ano | findstr :5432
```

### macOS

Instale via Homebrew:

```bash
$ brew install postgresql
```

Inicie o serviço:

```bash
$ brew services start postgresql
```

Crie o banco:

```bash
$ createdb warlocks_db

```

### Linux (Ubuntu/Debian)

Instale:

```bash
$ sudo apt update
$ sudo apt install postgresql postgresql-contrib
```

Inicie o serviço:

```bash
sudo systemctl start postgresql
```

Crie o banco:

```bash
sudo -u postgres psql -c "CREATE DATABASE warlocks_db;"
```

## Rodando o projeto

### Clone o repositório da branch local/prod

Crie o arquivo .env na raiz do projeto:

Gerar SECRET_KEY [AQUI](https://jwt.io/)

.env

```
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=warlocks_db
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/warlocks_db?schema=public"
SECRET_KEY=gereUmaChaveEColeAqui
```

PORT=3000

Instale as dependências

```bash
npm install
```

Rodar as migrations do Prisma

```bash
npx prisma migrate dev
```

Iniciar o backend

```bash
npm run start
```

## Rodar testes unitários

```bash
# unit tests
$ npm run test
```

## Desenvolvimento

[x] Back-end (Node.js / NestJS ou Express)

[x] Autenticação

[x] Rota de registro (inserir usuário no banco).

[x] Rota de login (retornar token JWT).

[x] Middleware/Guard para proteger as rotas que manipulam notas,
exigindo que o usuário esteja logado.

### CRUD de Notas

[x] Criar, listar, atualizar e excluir notas.

[x] Cada nota deve estar associada ao usuário que a criou, garantindo

que um usuário não veja ou manipule notas de outro.

[x] Banco de Dados (MongoDB ou outro de sua preferência)

[x] Coleção de usuários (com campos básicos: email, senha hash).

[x] Coleção de notas (referência ao usuário + título e descrição).

### Boas Práticas

[x] Organização mínima em pastas (controllers, services, etc., caso use

NestJS).

[x] Tratamento básico de erros (ex.: usuário não encontrado, falha de
autenticação).

### Plus

[x] PipeLine Github Actions para CI-CD

[x] Documentação da api [aqui](http://localhost:3000/api/docs#/) <--- Troque pela porta que o projeto se encontra

[x] Rota para editar e deletar usuário

## Meus contatos

- Héverton Vinícius - [Linkedin](https://www.linkedin.com/in/heverton-vinicius/)
- Email - [hagavepro@gmail.com]()
