# Triadge - Node.js API

API backend para o sistema Triadge desenvolvida com Node.js, TypeScript, Express e Prisma.

## 🚀 Tecnologias

- **Node.js** - Runtime JavaScript
- **TypeScript** - Superset JavaScript com tipagem
- **Express** - Framework web
- **Prisma** - ORM para banco de dados
- **PostgreSQL** - Banco de dados de produção
- **SQLite** - Banco de dados para testes
- **JWT** - Autenticação
- **Jest** - Testes automatizados

## 📁 Estrutura do Projeto

```
src/
├── config/           # Configurações da aplicação
├── modules/          # Módulos da aplicação
├── shared/           # Código compartilhado
│   ├── container/    # Injeção de dependência
│   ├── infra/        # Infraestrutura (HTTP, Prisma, etc.)
│   └── error/        # Tratamento de erros
├── @types/           # Definições de tipos
└── utils/            # Utilitários

docs/                 # Documentação
```

## 🛠️ Configuração do Ambiente

### Pré-requisitos

- Node.js 18+
- Yarn ou npm
- PostgreSQL (produção)
- SQLite (testes)

### Instalação

```bash
# Instalar dependências
yarn install

# Configurar variáveis de ambiente
cp .env.example .env
# Editar .env com suas configurações

# Gerar cliente Prisma
yarn prisma:generate

# Executar migrações
yarn prisma:migrate
```

## 🚀 Executando

```bash
# Desenvolvimento
yarn dev:server

# Testes
yarn test

# Testes E2E
yarn test:e2e

# Studio Prisma
yarn prisma:studio
```

## 📚 Documentação

- **[Configuração de Ambiente Isolado](./docs/PRISMA_ENV_FIX_SUMMARY.md)** - Detalhes completos sobre a configuração de testes isolados com SQLite e produção com PostgreSQL

## 📝 Scripts Disponíveis

| Comando | Descrição |
|---------|-----------|
| `yarn dev:server` | Inicia servidor em modo desenvolvimento |
| `yarn build` | Compila TypeScript |
| `yarn test` | Executa testes unitários |
| `yarn test:e2e` | Executa testes end-to-end |
| `yarn prisma:generate` | Gera cliente Prisma |
| `yarn prisma:migrate` | Executa migrações do banco |
| `yarn prisma:studio` | Abre interface gráfica do Prisma |
| `yarn lint` | Executa ESLint |

## 🔧 Configurações

### Ambiente de Produção
- **Banco:** PostgreSQL (Supabase)
- **JWT:** Tokens configurados
- **Porta:** 3331

### Ambiente de Testes
- **Banco:** SQLite (isolado por teste)
- **JWT:** Tokens de teste
- **Performance:** Testes rápidos

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
