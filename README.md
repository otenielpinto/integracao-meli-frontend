# Integracao Mercado Livre - Documentação do Projeto

## 🔗 Acesso ao Projeto

**URL de produção:** [https://auth.ogestorpro.com.br](https://auth.ogestorpro.com.br)

## 📖 Sobre o Projeto

Este é um projeto Next.js desenvolvido para autenticação com a API do Mercado Livre, permitindo que empresas autorizem acesso às suas contas através do protocolo OAuth2.

## 🛠️ Tecnologias Utilizadas

- **Next.js 15.2.1** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **Tailwind CSS 4.0.9** - Framework CSS utilitário
- **Cloudflare Pages** - Hospedagem e deploy
- **Axios** - Cliente HTTP para requisições
- **Edge Runtime** - Execução otimizada

## 🏗️ Estrutura do Projeto

```
src/
├── app/
│   ├── page.tsx                    # Página inicial
│   ├── autorizado/page.tsx         # Página pós-autorização
│   ├── callback/page.tsx           # Callback do OAuth
│   └── api/
│       ├── auth/
│       │   ├── route.ts           # Endpoint de autenticação
│       │   ├── callback/route.ts  # Callback da API
│       │   └── refresh-token/route.ts
│       ├── user/route.ts          # Endpoint de usuário
│       └── token/route.ts         # Endpoint de token
├── components/
│   └── Header.tsx                 # Componente de cabeçalho
└── lib/
    └── mercadoLivreService.js     # Serviço do Mercado Livre
```

## 🚀 Scripts de Build e Deploy

### Desenvolvimento

```bash
# Servidor de desenvolvimento com Turbopack
npm run dev

# Alternativas
yarn dev
pnpm dev
bun dev
```

### Build e Deploy

```bash
# Build padrão do Next.js
npm run build

# Build otimizado para Cloudflare Pages
npm run pages:build

# Preview local com Wrangler
npm run preview

# Deploy para Cloudflare Pages
npm run deploy

# Iniciar servidor de produção
npm run start
```

## 🔧 Configuração do Ambiente

### Variáveis de Ambiente (.env)

```env
# Configurações do Mercado Livre OAuth
MERCADO_LIVRE_CLIENT_ID=your_client_id
MERCADO_LIVRE_CLIENT_SECRET=your_client_secret
MERCADO_LIVRE_REDIRECT_URI=https://auth.ogestorpro.com.br/autorizado

# URLs da API externa
AUTH_API_BASE_URL=https://auth.komache.workers.dev
```

### Cloudflare Pages - Configuração

- **Framework preset**: Next.js
- **Build command**: `npm run pages:build`
- **Build output directory**: `.vercel/output/static`
- **Compatibility flags**: `nodejs_compat`

## 📡 API Endpoints

### Autenticação

- `GET /api/auth` - Inicia processo de autenticação
- `POST /api/auth/callback` - Processa callback do OAuth
- `POST /api/auth/refresh-token` - Renova token de acesso

### Dados

- `GET /api/user` - Informações do usuário
- `GET /api/token` - Validação de token

## 🔄 Fluxo de Autenticação

1. **Início**: Usuário acessa página inicial
2. **Autorização**: Redirecionamento para Mercado Livre
3. **Callback**: Recebimento do código de autorização
4. **Token**: Troca do código por token de acesso
5. **Dados**: Acesso às informações da conta

## 🌐 Páginas da Aplicação

### `/` - Página Inicial

- Interface para iniciar processo de autenticação
- Botão de conectar com Mercado Livre

### `/callback` - Callback OAuth

- Processa retorno da autorização
- Captura código de autorização da URL
- Redireciona para página de sucesso

### `/autorizado` - Pós-Autorização

- Formulário de dados da empresa
- Campos: Nome da empresa, CNPJ
- Integração com WhatsApp para suporte

## 🔗 Integrações Externas

### Mercado Livre API

- **OAuth 2.0** para autorização
- **Scopes**: Acesso a dados da conta

### Komache API (auth.komache.workers.dev)

- Gerenciamento de contas autorizadas
- Armazenamento de tokens
- Renovação automática de tokens

## 📱 Recursos Implementados

### Componentes

- **Header**: Navegação e branding
- **Loading States**: Indicadores de carregamento
- **Error Handling**: Tratamento de erros

### Funcionalidades

- ✅ Autenticação OAuth2 com Mercado Livre
- ✅ Renovação automática de tokens
- ✅ Interface responsiva
- ✅ Formulário de dados da empresa
- ✅ Integração com WhatsApp
- ✅ Deploy automático na Cloudflare

## 🚨 Troubleshooting

### Erro: "nodejs_compat flag not set"

Adicione a flag `nodejs_compat` nas configurações de compatibilidade do Cloudflare Pages.

### Erro de CORS

Verifique se as URLs de callback estão corretamente configuradas no painel do Mercado Livre.

### Token expirado

O sistema renova automaticamente tokens através do endpoint `/api/auth/refresh-token`.

## 📚 Referências

- [Repositório GitHub](https://github.com/otenielpinto/integracao-meli-frontend.git/)
- [Next.js on Cloudflare Pages](https://developers.cloudflare.com/pages/framework-guides/nextjs/ssr/get-started/)
- [Cloudflare Examples](https://github.com/backpine/cloudflare-example-deployments/blob/main/example-nextjs-on-pages/src/app/page.tsx)
- [Next.js Documentation](https://nextjs.org/docs)
- [Mercado Livre API](https://developers.mercadolivre.com)

## 🏃‍♂️ Getting Started

1. **Clone o repositório**

   ```bash
   git clone https://github.com/otenielpinto/integracao-meli-frontend.git
   cd integracao-meli-frontend
   ```

2. **Instale as dependências**

   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente**

   ```bash
   cp .env.example .env
   # Edite o arquivo .env com suas credenciais
   ```

4. **Execute em desenvolvimento**

   ```bash
   npm run dev
   ```

5. **Acesse o projeto**
   Abra [http://localhost:3000](http://localhost:3000) no seu navegador

## 📄 Licença

Este projeto é privado e de propriedade da Komache.

---

**Desenvolvido com ❤️ usando Next.js e Cloudflare Pages**
