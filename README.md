# ERP - Módulo de Produtos

🟢 **[Acesse o sistema ao vivo aqui](https://alysson-santos-bit.github.io/erp-produtos/)**

### 🔐 Acesso para Recrutadores / Visitantes
Para testar o sistema, utilize as credenciais abaixo:
- **E-mail:** alysson@erp.com
- **Senha:** alysson1234

## Funcionalidades
- Renderização dinâmica da vitrine e do carrinho.
- Motor de busca em tempo real (*case-insensitive*).
- Filtro de categorias usando **Hash Maps** para performance `O(1)`.
- Motor financeiro (cálculo de totais e controle de quantidades).
- Persistência de dados salvando o carrinho no `localStorage`.
- Notificações visuais (Toasts) de feedback.
- Sistema de Autenticação (Login e Logout) integrado com **Firebase Auth**.
- Proteção de Rota (*Route Guards*) impedindo o acesso não autorizado à vitrine de produtos.
- Separação de responsabilidades utilizando Módulos ES6 (`type="module"`).

## Tecnologias Utilizadas
- HTML5
- Vanilla JavaScript
- Tailwind CSS (via CDN)
- BaaS: Firebase (Authentication)

## Como executar localmente
1. Faça o clone do repositório.
2. Como o projeto utiliza ES6 Modules, é necessário rodar a aplicação através de um servidor local (como a extensão *Live Server* do VSCode).
3. Abra o arquivo `login.html` no seu servidor local para iniciar. (Não é necessário instalar Node.js ou dependências via npm).