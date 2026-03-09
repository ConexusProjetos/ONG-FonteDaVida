# Conexus — ONG Fonte da Vida

Sistema web da ONG Fonte da Vida, organizado em monorepo com frontend e backend.

---

## Tecnologias

| Camada    | Tecnologia |
|-----------|------------|
| Frontend  | Vue + TypeScript |
| Backend   | NestJS |
| Runtime   | Node.js v24.14.0 |
| Pacotes   | NPM Workspaces |

---

## Pré-requisitos

- [Node.js v24.14.0](https://nodejs.org/)

Verifique sua versão:
```bash
node -v
```

> Se necessário, use o [nvm](https://github.com/nvm-sh/nvm) para gerenciar versões do Node.

---

## Instalação e execução

### 1. Clonar o repositório

```bash
mkdir conexus && cd conexus
git clone https://github.com/ConexusProjetos/ONG-FonteDaVida.git
cd ONG-FonteDaVida
```

### 2. Instalar dependências

Na raiz do projeto:

```bash
npm install
```

### 3. Configurar variáveis de ambiente

> ⚠️ O projeto não inicia sem os arquivos `.env` configurados.

Crie um `.env` em cada pasta:

```
conexus-backend/.env
conexus-frontend/.env
```

Consulte a equipe para obter os valores de cada arquivo.

### 4. Rodar o projeto

**Frontend + Backend juntos (recomendado):**
```bash
npm run dev
```

**Separadamente:**
```bash
# Backend
cd conexus-backend
npm run start:dev

# Frontend
cd conexus-frontend
npm run dev
```

---

## Estrutura do projeto

```
ONG-FonteDaVida/
├── conexus-backend/       # API NestJS (.env aqui)
├── conexus-frontend/      # App Vue (.env aqui)
├── package.json           # Raiz — controla os workspaces
└── README.md
```

---

## Instalando novos pacotes

Sempre instale pacotes a partir da **raiz do projeto**, usando `--workspace`:

```bash
# Frontend
npm install <pacote> --workspace=conexus-frontend

# Backend
npm install <pacote> --workspace=conexus-backend
```

---

## Boas práticas

- Nunca suba o arquivo `.env` para o repositório
- Instale pacotes sempre pela raiz, respeitando o workspace correto
- Use commits organizados e descritivos
