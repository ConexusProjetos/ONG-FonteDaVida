🌱 Conexus – ONG Fonte Da Vida

Sistema web da ONG Fonte Da Vida, contendo frontend e backend organizados em monorepo.

📦 Tecnologias Utilizadas

Node.js (versão recomendada: 24.14.0)

NPM Workspaces

Frontend: Vue.ts

Backend:  NestJS

✅ Pré-requisitos

Antes de começar, instale:

Node.js v24.14.0
🔎 Verifique sua versão com:

node -v

Se necessário, utilize o nvm para gerenciar versões do Node.

🚀 Como Rodar o Projeto
1️⃣ Clonar o repositório

Crie uma pasta para o projeto:

mkdir conexus
cd conexus

Clone o repositório:

git clone https://github.com/ConexusProjetos/ONG-FonteDaVida.git

Entre na pasta criada pelo clone:

cd ONG-FonteDaVida
2️⃣ Instalar as dependências

No diretório raiz do projeto (onde estão as pastas do backend e frontend), execute:

npm install

Esse comando irá instalar as dependências:

📦 do frontend

📦 do backend

3️⃣ Configurar variáveis de ambiente

⚠️ IMPORTANTE

Você deve adicionar os arquivos .env nas seguintes pastas:

conexus-backend/
conexus-frontend/

O arquivo deve ficar na raiz do backend.

Sem isso, o backend não irá iniciar corretamente.
é importante mencionar que o .env tem do frontend e o outro do backend

▶️ Rodar o Projeto
🔥 Rodar Frontend + Backend juntos

No diretório raiz do projeto:

npm run dev

Esse comando executa frontend e backend simultaneamente.

⚙️ Rodar separadamente
🖥 Backend
cd conexus-backend
npm run start:dev
🌐 Frontend
cd conexus-frontend
npm run dev

👨‍💻 Instruções para Desenvolvedores

Este projeto utiliza monorepo com NPM Workspaces, portanto siga o padrão abaixo.

📌 Instalar novos pacotes

⚠️ Sempre instale pacotes a partir da pasta raiz do projeto.

Use o parâmetro --workspace para indicar onde o pacote será instalado.

Instalar no Frontend:
npm install nome-do-pacote --workspace=conexus-frontend
Instalar no Backend:
npm install nome-do-pacote --workspace=conexus-backend
🎯 Por que isso é importante?

Mantém a organização do monorepo

Evita dependências no lugar errado

Preserva o padrão arquitetural do projeto

📂 Estrutura do Projeto
ONG-FonteDaVida/
│
├── conexus-backend/
│   └── (.env deve ficar aqui)
│
├── conexus-frontend/
│
├── package.json (raiz - controla os workspaces)
└── README.md
🧠 Boas Práticas

Sempre verificar se está na pasta correta antes de rodar comandos.

Nunca subir o arquivo .env para o repositório.

Usar commits organizados e descritivos.

Seguir o padrão de estrutura já definido no projeto.
