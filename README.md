# Grade de Programação Front-End

## Sobre

Repositório da aplicação Front-End da Grade de Programaçãoda RPC, afiliada da Rede Globo. Esta aplicação realiza requisições na API "EPG" disponibilizada pela Rede Globo e na API Alternativa baseada nos dados da API EPG.

Por causa do cors da API EPG para rodar a aplicação local fazendo requisição apenas nela, necessita desabilitar o cors do navegador e em produção o sistema sempre recorre a API Alternativa. Caso queira ver a programação do dia atual, se ele não estiver armazenado no banco, deve-se utilizar a aplicação back-end primeiro e depois rodar a aplicação front-end.
A explicação de uso da aplicação back-end se encontra no repositório [grade de programação back-end](https://github.com/kasvrol/grade-de-programacao-back-end), podendo fazer a requisição direto para o link em produção.

A API desenvolvida para esse projeto traz apenas a programação dos dias 08, 09. 10, 11, 12, 13, 14 por causa das limitações do banco de dados utilizado.

> <pre>
> 
> public/ # Imagens, fontes, etc.
> dist/ # É gerado após build para execução
> src/# Arquivos que aparecerão em tela/components.
> pages/api/# Arquivos de requisições.
> components/ # Componentes para economizar linhas ou reutilizar.
> utils/ # Bibliotecas/cores que pode alterar tudo.
> pages/ # Arquivos que servem como roteamente da url.
> styles/ # Arquivos css.
> utils/ # Funções/tipos que podem ser reutilizados
> 
>  </pre>

## Ferramentas utilizadas:

A aplicação foi construída utilizando as seguintes tecnologias e bibliotecas:

-   Next.js v13.4.19
-   React.js v18.2.0
-   AntDesign v^5.9.0
-   Mui Icons v^5.14.8
-   Node v18.16.0
-   NPM v9.5.1
-   Axios v^1.5.0

## Como Executar a Aplicação em Sua Máquina:

Para executar a aplicação em sua máquina local, siga os passos abaixo:

1 - Clone este repositório para sua máquina local usando o seguinte comando:

```bash
git clone https://github.com/kasvrol/grade-de-programacao-front-end.git
```

2 - Navegue até o diretório do projeto:

```bash
cd grade-de-programacao-front-end
```

3 - Instale as dependências do projeto usando o npm:

```bash
npm install
```

4 - Agora você pode iniciar a aplicação em sua máquina usando o seguinte comando:

```bash
npm run dev
# or
yarn dev
```

Isso iniciará a aplicação em seu ambiente local. Abra um navegador da web e acesse http://localhost:3000 para ver a Grade de Programação Front-End em ação.
