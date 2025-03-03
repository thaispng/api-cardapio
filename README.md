# Configuração do Projeto NestJS

## Passos para configurar o ambiente

### 1. Criar o arquivo `.env`
Antes de iniciar o projeto, crie um arquivo `.env` na raiz do projeto e adicione a seguinte variável de ambiente:

```
DATABASE_URL="mongodb+srv://thaisvtr26:SbmGilfhsriQboED@cluster0.x2jpc.mongodb.net/cardapio_db?retryWrites=true&w=majority&appName=Cluster0"
```

### 2. Instalar dependências
Execute o seguinte comando para instalar todas as dependências do projeto:

```
npm install
```

### 3. Iniciar o servidor
Para rodar o projeto em modo de desenvolvimento, utilize o comando:

```
npm run dev:start
```

O servidor estará rodando e pronto para uso!

### 4. Acessar a documentação Swagger
Se o projeto estiver configurado para utilizar Swagger, você pode acessá-lo após iniciar o servidor, navegando até:

```
http://localhost:3000/api
```

Isso abrirá a interface do Swagger onde você pode visualizar e testar as APIs disponíveis.
