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
# Migration MySQL
npx prisma migrate deploy; # yarn prisma migrate deploy
```

```bash
# Start Server
npm start; # yarn start
```
