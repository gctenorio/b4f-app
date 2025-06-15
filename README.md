# b4f-app

Plataforma digital voltada para conectar empresas, promover desenvolvimento, trocas de indicações, microconsultorias e muito mais. Desenvolvido como um projeto CRM Headless com autenticação, multiempresa e dados seguros desde o início.

## 🧱 Tecnologias

- [Next.js 14](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Supabase](https://supabase.com/) (PostgreSQL + Auth + RLS)
- [ESLint](https://eslint.org/)
- [App Router (Next.js)](https://nextjs.org/docs/app)

## 🚀 Como rodar localmente

1. **Clone o repositório:**

```bash
git clone https://github.com/seu-usuario/b4f-app.git
cd b4f-app

2. **Instale as dependências:**
npm install

3. **Configure o ambiente:**
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

4. **Rode o projeto**
npm run dev

Acesse http://localhost:3000 no navegador.

**Segurança**
Todas as tabelas estão protegidas por Row-Level Security (RLS).

A autenticação é feita via Supabase Auth.

Informações sensíveis (como CNPJ, dados do usuário e empresa) têm regras específicas de acesso.

Estrutura do Projeto
/src
  /app
    layout.tsx
    page.tsx
    /login
    /cadastro
  /lib
    supabase.ts
/public
.env.local
README.md
Autor

Gustavo Tenorio
Projeto individual com foco em aprendizado, empreendedorismo digital e boas práticas de desenvolvimento moderno.