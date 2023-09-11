# Grade de Programação Front-End

## Sobre

Este é o repositório da aplicação web de Grade de Programação Front-End desenvolvida para exibir a programação da RPC, afiliada da Rede Globo. Esta aplicação realiza requisições na API "EPG" disponibilizada pela Rede Globo.

A API desenvolvida para esse projeto traz apenas a programação dos dias 08, 09. 10, 11 por causa das limitações do banco de dados utilizado.

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
