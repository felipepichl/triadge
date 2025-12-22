# 🌟 Triadge - Sistema de Controle Financeiro

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Expo](https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)

Sistema completo de controle financeiro pessoal desenvolvido com tecnologias modernas, oferecendo uma experiência unificada entre web e mobile para gestão de finanças.

---

## 📱 Ecossistema Triadge

O Triadge é composto por três aplicações principais:

### 🖥️ **Web Frontend** (`web/vite-web/`)

Interface web responsiva construída com React, Vite e TypeScript, oferecendo uma experiência completa de dashboard financeiro.

### 📱 **Mobile App** (`mobile/`)

Aplicativo mobile desenvolvido com React Native e Expo, proporcionando acesso às funcionalidades em dispositivos móveis.

### ⚙️ **API Backend** (`server/node-js/`)

API RESTful robusta desenvolvida em Node.js com TypeScript, seguindo princípios de Clean Architecture e DDD.

---

## 🚀 Principais Funcionalidades

### 💰 **Gestão Financeira Completa**

- Controle de receitas e despesas
- Categorização inteligente de transações
- Relatórios e gráficos detalhados
- Dashboard com métricas em tempo real

### 📊 **Gestão de Investimentos**

- Controle de carteira de ações
- Acompanhamento de cotações em tempo real
- Histórico de negociações
- Relatórios de performance

### 📅 **Contas a Pagar**

- Controle de contas fixas e variáveis
- Lembretes de vencimento
- Histórico de pagamentos
- Relatórios mensais

### 🔐 **Autenticação Segura**

- Login com email e senha
- Integração com Google OAuth
- Controle de sessão automático
- Proteção de rotas privadas

---

## 🛠️ Tecnologias Utilizadas

### **Frontend Web**

- ⚛️ **React 18** - Framework UI
- ⚡ **Vite** - Build tool e dev server
- 📘 **TypeScript** - Tipagem estática
- 🎨 **Tailwind CSS** - Styling utility-first
- 🧩 **Shadcn/ui** - Componentes UI
- 🪝 **React Hook Form** - Gerenciamento de formulários
- ✅ **Zod** - Validação de dados
- 📡 **Axios** - Cliente HTTP

### **Backend API**

- 🟢 **Node.js** - Runtime JavaScript
- 📘 **TypeScript** - Tipagem estática
- 🚀 **Express** - Framework web
- 🗄️ **Supabase** - Banco de dados PostgreSQL
- 🔐 **JWT** - Autenticação
- 📋 **Prisma** - ORM
- 🧪 **Jest** - Testes automatizados

### **Mobile**

- 📱 **React Native** - Framework mobile
- ⚡ **Expo** - Plataforma de desenvolvimento
- 🎨 **Gluestack UI** - Componentes UI
- 📡 **Axios** - Cliente HTTP

---

## 📁 Estrutura do Projeto

```
triadge/
├── web/                    # Aplicação Web
│   └── vite-web/          # Frontend React/Vite
├── mobile/                # Aplicativo Mobile
│   ├── src/               # Código fonte React Native
│   └── assets/            # Recursos estáticos
├── server/                # Backend API
│   └── node-js/           # API Node.js/TypeScript
└── README.md             # Documentação principal
```

---

## 🚀 Como Executar

### **Pré-requisitos**

- Node.js 18+
- Yarn ou npm
- Conta no Supabase (para o backend)

### **1. Clonar o repositório**

```bash
git clone https://github.com/seu-usuario/triadge.git
cd triadge
```

### **2. Backend (API)**

```bash
cd server/node-js
yarn install
# Configure as variáveis de ambiente
yarn dev:server
```

**URL:** http://localhost:3333

### **3. Frontend Web**

```bash
cd web/vite-web
yarn install
yarn dev
```

**URL:** http://localhost:3579

### **4. Mobile App**

```bash
cd mobile
yarn install
yarn start
# Escolha a plataforma (iOS/Android/Web)
```

---

## 🔧 Configuração

### **Variáveis de Ambiente**

#### **Backend (.env)**

```env
DATABASE_URL="postgresql://..."
JWT_SECRET="your-secret-key"
SUPABASE_URL="https://your-project.supabase.co"
SUPABASE_ANON_KEY="your-anon-key"
```

#### **Frontend (.env.local)**

```env
VITE_API_URL="http://localhost:3333"
VITE_SUPABASE_URL="https://your-project.supabase.co"
VITE_SUPABASE_ANON_KEY="your-anon-key"
```

---

## 🧪 Testes

### **Backend**

```bash
cd server/node-js
yarn test              # Todos os testes
yarn test:watch        # Modo watch
yarn test:coverage     # Cobertura de testes
```

---

## 📚 Documentação da API

Após iniciar o servidor backend, acesse:
**👉 http://localhost:3333/api-docs**

Documentação interativa com Swagger UI mostrando todos os endpoints disponíveis.

---

## 🎨 Design System

O projeto utiliza um design system consistente baseado em:

- **Cores**: Tema dark/light automático
- **Tipografia**: Roboto como fonte principal
- **Componentes**: Shadcn/ui para web, Gluestack para mobile
- **Ícones**: Lucide React (web) / ícones nativos (mobile)

---

## 🤝 Contribuições

Contribuições são bem-vindas! Siga os passos:

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

---

## 📝 Licença

Este projeto está sob a licença **MIT**.  
Consulte o arquivo [LICENSE](./LICENSE) para mais detalhes.

---

## 📧 Contato

**Felipe Pichl**  
📧 [felipe.pichl@hotmail.com](mailto:felipe.pichl@hotmail.com)  
🔗 [LinkedIn](https://www.linkedin.com/in/felipe-pichl)  
🔗 [GitHub](https://github.com/felipepichl)

---

## 🙏 Agradecimentos

- Rocketseat pela inspiração e metodologia
- Comunidade React e Node.js
- Contribuidores do projeto

---

_Desenvolvido com ❤️ para ajudar pessoas a controlarem melhor suas finanças pessoais._
