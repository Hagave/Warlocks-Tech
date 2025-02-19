<p align="center">
  <a href="https://github.com/nestjs/nest" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# Descrição

## Backend - Teste técnico Warlocks Tech

### Existem 2 versões deste projeto.

Nota:

#### Este é o guia para rodar o projeto com docker. Caso queira rodar ele local, vá para a branch [PROD/DOCKER](https://github.com/Hagave/Warlocks-Tech/prod/local)

[prod/local](https://github.com/Hagave/Warlocks-Tech/prod/local)

[prod/docker]() <- você está aqui

## Informações importantes

Você pode fazer chamadas diretas para a api usando o postman/insomnia ou a documentação da api que está localizada [aqui](http://localhost:3000/api/docs#/)

Mas é altamente recomendável que use o frontend para fazer essas requisições.

Voce consegue baixar o [FrontEnd aqui](https://github.com/Hagave/Warlock-Tech-FE).

## Rodando o projeto

### Clone o repositório da branch prod/docker

Crie o arquivo .env na raiz do projeto:

Gerar SECRET_KEY [AQUI](https://jwt.io/)

.env

```
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=warlocks_db
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/warlocks_db?schema=public"
SECRET_KEY=gereUmaChaveEColeAqui
PORT=3000
```

## Você precisa garantir que o serviço docker esteja rodando antes dos passos!

### Windows (WSL ou Docker Desktop)

#### Verifique se o Docker está rodando

No terminal (CMD, PowerShell ou Git Bash), rode:

```bash
docker info
```

Se aparecer algo como "Cannot connect to the Docker daemon", o Docker não está rodando.

### Inicie o Docker

Se estiver usando Docker Desktop, abra o programa manualmente.

Se estiver usando o WSL (Windows Subsystem for Linux), rode:

```bash
sudo service docker start
```

### Linux (Ubuntu, Debian)

Verifique se o Docker está rodando

```bash
systemctl is-active docker
```

Se a saída for inactive, significa que o Docker não está rodando.

Se estiver usando Docker Desktop, abra o programa manualmente.

Ou tente o comando pelo terminal e inicie o Docker

```bash
sudo systemctl start docker
```

### MacOS

docker info

```bash
sudo systemctl start docker
```

Se der erro, significa que o Docker não está ligado.

Inicie o Docker

Abra o Docker Desktop manualmente.

Ou, no terminal, tente rodar:

```bash
open /Applications/Docker.app
```

Após certificar que o serviço do docker está rodando, tente o comando abaixo

```bash
docker-compose up --build -d
```

Rodar os comandos do Prisma dentro do container do backend

Como o backend agora está rodando dentro do Docker, você precisa executar os comandos dentro do container, assim:

```bash
#gerar o prisma
docker exec -it backend npx prisma generate
#Criar os schemas no banco
docker exec -it backend npx prisma migrate deploy

```

Isso iniciará:

✅ O PostgreSQL.

✅ As migrations do prisma.

✅ E o backend.

Se tudo estiver certo, seu backend estará rodando em [Aqui](http://localhost:3000)

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
