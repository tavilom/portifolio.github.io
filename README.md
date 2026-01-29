# Portfolio Simples


## 1 - Descrição do Sistema:

### 1.1 Principais Funcionalidades:
° Módulo de Projetos do Fgma: Área destinada para publicar os prototipos do figma. <br/>
° Módulo de Projetos do Github: Área destinada para publicar os links, junto com stack e uma descrição sobre os repositórios trabalhados. <br/>
° Módulo de Contato: Área destinado para realziar o contato. <br/>

#     

## 2 - Técnologias usadas no projeto

### Devido ao fato de ser um portfólio simples com intuito de poder usar a hospedagem do github, é feito apenas com hardcode em front-end


### 2.1 FrontEnd
Utilizado o framekork ReactJS, junto com a linguagem de programação TypeScript, o builder Vite, e a biblioteca do Material UI (MUI).
#

## 3 - Clonando o repositório e instalando dependencias

Primeiro utilizando o comando **git clone** mais o endereço **SSH** ou **HTTPS**, o git vai realizar um clone do repositorio. 
Após realizar o **clone**, abra a pasta raiz do projeto e rode o comando **npm install** ou só **npm i** para instalar todas as dependencias do Projeto.
#

## 4 - Executando o sistema localmente em ambiente de teste
Após realizar o clone do projeto e instalar as dependencias, execute o comando na pasta raiz **npm run dev** para startar o projeto.
O sistema irá rodar no endereço http://localhost:5173/"nome do seu repositorio" ** lembrando que tem que contem .github.io


## 5 -  Publicação do projeto
Para poder publicar o projeto o nome do repositorio deve ser "seu-repo.github.io"(onde diz seu-repo, mudar para o nome real), após criar o repositório, vá em configurações, na aba lateral no github, encontre a opção Pages, deixe as configurações igual as seguintes:

### Build and deployment -> Sourece -> Deploy from a branch

### Brach vai estar em  "main", mude para "gh-rapes" e o folder pode manter "/(root)"
Após isso no terminal da pasta do projeto no seu computador rode os comando **npm run build** e depos **npm run deploy**

o link vai ser **seu-usuario.github.io/seu-repo.github.io/**