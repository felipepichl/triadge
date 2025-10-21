# 💰 Financial Control API

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![Jest](https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)

API RESTful desenvolvida em **Node.js** com **TypeScript**, seguindo princípios de **DDD (Domain-Driven Design)** e **Clean Architecture**, para o controle e categorização de transações financeiras pessoais.  

---

## 🚀 Tecnologias e ferramentas

- **Node.js** – servidor backend  
- **TypeScript** – tipagem estática e produtividade  
- **Express** – framework HTTP  
- **Prisma ORM** – acesso ao banco de dados  
- **SQLite** (ambiente local)  
- **Tsyringe** – injeção de dependências  
- **Jest + Supertest** – testes automatizados  
- **ESLint + Prettier** – padronização de código  
- **Swagger** – documentação interativa da API  
- **Multer** – upload de arquivos  

---

## 🧩 Arquitetura

A aplicação segue o padrão **DDD (Domain-Driven Design)** com módulos independentes, cada um responsável por um contexto específico.  

```
src/
 ├── modules/
 │   ├── transactions/
 │   │   ├── domain/
 │   │   ├── repositories/
 │   │   ├── useCases/
 │   │   └── infra/
 │   ├── financialCategory/
 │   ├── accountPayable/
 │   └── ...
 ├── shared/
 │   ├── core/
 │   ├── infra/
 │   └── container/
 └── config/
```

Cada **módulo** contém:

- `domain` → Entidades e regras de negócio  
- `useCases` → Casos de uso independentes  
- `repositories` → Interfaces e implementações (Prisma / InMemory)  
- `infra` → Rotas, controllers e integração com o banco  

---

## ⚙️ Funcionalidades principais

- ✅ Criar e listar transações financeiras  
- 📊 Filtros por tipo (`income` | `outcome`)  
- 📅 Filtros por mês ou intervalo de datas  
- 🗂️ Categorização de transações por categoria e subcategoria  
- 🧾 Listagem de totais por categoria  
- 🔐 Autenticação com JWT  
- 🧪 Testes unitários e de integração  
- 📘 Documentação via Swagger  

---

## 📦 Instalação e execução

```bash
# Clonar o repositório
git clone https://github.com/seu-usuario/financial-control-api.git

# Entrar na pasta
cd financial-control-api

# Instalar dependências
yarn install

# Gerar o Prisma client
yarn prisma:generate

# Executar o servidor
yarn dev:server
```

Por padrão, o servidor roda em:  
👉 **<http://localhost:3333>**

---

## 🧪 Testes

```bash
# Executar testes unitários e e2e
yarn test
```

Os testes utilizam **repositórios in-memory**, garantindo isolamento do banco de dados real.

---

## 📖 Documentação

Após iniciar o servidor, acesse:  
👉 **<http://localhost:3333/api-docs>**

A interface Swagger mostrará todos os endpoints disponíveis e exemplos de requisição/resposta.

---

## 🧠 Conceitos aplicados

- Clean Architecture  
- Domain-Driven Design (DDD)  
- Dependency Injection (IoC)  
- Repository Pattern  
- SOLID Principles  
- Testes com Jest  
- Separação clara entre camadas (Domain, Application, Infra)  

---

## 💡 Aprendizados

Durante o desenvolvimento, aprimorei:

- Estruturação de projetos escaláveis com DDD  
- Isolamento de camadas e dependências  
- Testes unitários com mocks in-memory  
- Configuração e integração do Prisma ORM  
- Boas práticas de código e padronização  

---

## 🤝 Contribuições e contato

Fique à vontade para abrir issues, sugerir melhorias ou contribuir com o projeto!  
Se quiser trocar uma ideia sobre backend, arquitetura ou DDD, será um prazer conversar 👇  

📧 **<felipe.pichl@hotmail.com>**  
🔗 [LinkedIn](https://www.linkedin.com/in/felipe-pichl)  
🔗 [GitHub](https://github.com/felipepichl)

---

## 🧾 Licença

Este projeto está sob a licença **MIT**.  
Consulte o arquivo [LICENSE](./LICENSE) para mais detalhes.
