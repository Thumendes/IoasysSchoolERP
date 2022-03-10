# Ioasys School ERP - Thumendes

<img src="https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white" />
<img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" />
<img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" />
<img src="https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white" />

Esta API tem o objetivo de gerenciar uma escola de ensino.

Os diretores (Admin) podem cadastrar, editar e excluir alunos, professores, turmas, matérias e provas.
Os professores podem cadastrar, editar e excluir provas.
Os alunos podem ver suas notas e provas.

## Modules

- Class (Turma)
- Grade (Nota)
- Exam (Prova)
- Subject (Materia)
- Student (Aluno)
- Teacher (Professor)
- User (Usuário)

### Requirements

- [x] CRUD All Modules
- [x] Login
- [x] Add Teacher To a Class
- [x] Add Student To a Class
- [x] Add Subject To a Class
- [x] Student can see his grades (resume)

# Como rodar?

Requisitos:

- NodeJS
- MySQL Rodando

Passo a passo:

```bash
# Clone o repositório
git clone https://github.com/Thumendes/IoasysSchoolERP.git
```

Copiar o arquivo .env.example para .env e preencher os dados de conexão com o MySQL.

```env
DATABASE_URL=mysql://<Coloque o usuário aqui>:<Coloque a senha aqui>@localhost:3306/ioasys-school-erp
```

Agora é só rodar os comandos abaixo:

```bash
# Instalação
npm install; # yarn install
```

```bash
# Migration MySQL + Seed
npx prisma migrate deploy; # yarn prisma migrate deploy
```

```bash
# Start Server
npm start; # yarn start
```

# Testes

## Jest

Para testar a base do funcionamento, criei alguns testes com Jest.
Neles eu testo se a aplicação está funcionando corretamente, se o login está funcionando, e uma rota protegida.

```bash
npm run test; # yarn test
```

## Insomnia

Parar um teste mais completo, com as principais rotas da API, é possível utilizar o Insomnia.
O arquivo para importação é `insomnia.json`.

Nas variáveis de ambiente, você deve informar alguns tokens de autenticação:

- `Token` (Token de administrador)
- `TokenAsStudent` (Token de aluno)
- `TokenAsTeacher` (Token de professor)

Para isso, você deve fazer login com cada usuário e pegar o token na resposta.
Vou passar alguns usuários de exemplo, mas no arquivo `./prisma/seed.ts` tem mais opções de usuários cadastrados:

- `Token` -> arthur@dinamica.com (Senha: 'admin123')
- `TokenAsTeacher` -> luciane@dinamica.com (Senha: 'luciane')
- `TokenAsStudent` -> 2022001@dinamica.com (Senha: '2022001')

Para buscar o token:

1. Na rota `authenticate`, preencher o campo `email` com o email do usuário e o campo `password` com a senha dele.
2. Na resposta, copiar o `token` e colar na variável em questão.

Para testar rotas que estão protegidas, basta adicionar o header `Authorization` com a variavel de token desejado.
As regras de permissão estão no arquivo `./src/config/AclConfig.ts`.
