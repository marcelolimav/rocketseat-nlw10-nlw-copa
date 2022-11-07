1- criação da pasta do projeto

```sh
mkdir server
cd server
```

2- Inicialização do projeto "javascript", (criação do package.json)

```sh
npm init -y
```

3- Instalação do typescript como dependência de desenvolvimento

```sh
npm i typescript -D
```

4- Setup do typescript, (cria o tsconfig.json), ajustar o target para "es2020"

```sh
npx tsc --init
```

5- Instalação do Fastify ( framework responsável por fazer as rotas da api como o express ). Instale também o CORS para ajudar na segurança da aplicação

```sh
npm i fastify
npm i @fastify/cors
```

6- Instalação do tsx como dependência de desenvolvimento. Para automatizar o processo de watch para compilar o código sem que seja preciso para ele e executar novamente após uma alteração.

```sh
npm i tsx -D
```

7- Ajustar o package.json para que o script de execução fique automático. Com isso é possível executar o "npm run dev"

```sh
  "scripts": {
    "dev": "tsx watch src/server.ts"
  },
```

8- Instalação do ORM Prisma, - @prisma/client: Usado para conectar a aplicação com o banco de dados - prisma: interface de linha de comando para automatizar a criação de tabelas... Instala a extensão Prisma no VSCode para ajustar na syntax.

```sh
  npm i prisma -D
  npm i @prisma/client
```

9- Executar o prisma para instalar o BD SQLite

```sh
  npx prisma init --datasource-provider SQLite
```

10- Ajuste, crie as tabelas no arquivo da pasta \prisma\schema.prisma e depois execute o comando para que ele crie de fato. O "dev" é o banco criado.

```sh
  npx prisma migrate dev
```

11- para visualizar o banco de dados pelo navegador execute o comando

```sh
  npx prisma studio
```

12- Para gerar o diagrama das entidades (models) pelo Prisma instale

```sh
  npm i prisma-erd-generator @mermaid-js/mermaid-cli -D
```

após instalado ajuste o arquivo \prisma\schema.prisma com o código abaixo para indicar como sere gerado o erd

```sh
generator erd {
  provider = "prisma-erd-generator"
}
```

depois execute o comando para gerar o ERD

```sh
npx prisma generate
```
