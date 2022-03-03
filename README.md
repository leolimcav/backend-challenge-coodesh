# [Desafio Back-End Coodesh (Space Flight News API)](https://lab.coodesh.com/public-challenges/back-end-challenge-2021)

## Descrição

API de informações relacionadas a voos espaciais, baseado no API pública [Space Flight News](https://api.spaceflightnewsapi.net/v3/documentation)

## Link do video de apresentação

[Vídeo-Youtube](https://youtu.be/zOaYN7fCE9Q)
[Vídeo-Loom](https://www.loom.com/share/022236d28e9044c2bd867cbae1ce76a4)

## Tecnologias

- [NodeJS](https://nodejs.org/en/)
- [Typescript](https://www.typescriptlang.org/)
- [NestJS](https://nestjs.com/)
- [Prisma](https://www.prisma.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- [Jest](https://jestjs.io/)
- [Yarn](https://yarnpkg.com/)
- [Axios](https://axios-http.com/docs/intro)

## Instalação
Para instalar os pacotes do projeto execute com o `yarn` ou `npm`:
```bash
$ npm install
```
ou

```bash
$ yarn
```

## Executando a aplicação

Antes de executar a aplicação é necessário configurar o arquivo de variáveis de ambiente.
Para isso faça uma copia do arquivo `.env.example` e salve com o nome `.env`.
Em seguida preencha as informações no arquivo `.env`.

```env
PORT = "Porta que a api irá responder"
SPACEFLIGHT_API_URL= "Url da api do spaceflight api <https://api.spaceflightnewsapi.net/v3/>"
DATABASE_URL= "Url de conexão com o banco para o prisma. Ex: postgresql://mydbuser:mydbpasswordt@mydbhost:5432/mydbname?schema=public"
POSTGRES_DB= "Nome do banco que irá executar no container"
POSTGRES_USER= "Nome do usuario do banco postgres executando no container"
POSTGRES_PASSWORD= "Senha do usuário do postgres executando no container"
```
Após isso execute o comando de acordo com o ambiente.

```bash
# Ambiente de desenvolvimento local
$ npm run start
# ou com yarn
$ yarn start

# Ambiente de desenvolvimento com docker
$ docker-compose up -d --build

# watch mode
$ npm run start:dev
# ou com yarn
$ yarn start:dev

# Ambiente de produção
$ npm run start:prod
# ou com yarn
$ yarn start:prod
```
## Rodando as migrations

O projeto utiliza o ORM Prisma para lidar com conexão e ações no banco e para configurar o banco de dados apropriadamente é necessário rodar as migrations.

```bash
# Ambiente local
$ npm run prisma migrate dev
# ou
$ yarn prisma migrate dev

# Ambiente de desenvolvimento com docker
$ docker exec -it spaceflight-api npm run prisma migrate dev
# ou
$ docker exec -it spaceflight-api yarn run prisma migrate dev

# Para ambiente de produção
$ npm run prisma migrate deploy
# ou
# yarn prisma migrate deploy
```

## Executando os testes

```bash
# unit tests
$ npm run test
# ou com yarn
$ yarn test

# e2e tests
$ npm run test:e2e
# ou com yarn
$ yarn test:e2e

# test coverage
$ npm run test:cov
# ou com yarn
$ yarn test:cov

```

## Swagger

O endpoint para visualizar o swagger do projeto é `<base_url>/swagger`

## Contatos

- Autor - [Leonardo Lima Cavalcante](https://github.com/leolimcav)
- [LinkedIn](https://www.linkedin.com/in/leonardo-lima-cavalcante/)

> This is a challenge by [Coodesh](https://coodesh.com/)
