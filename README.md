# RecicLAR
**Objetivo do Sistema:**  Auxiliar empresas de reciclagem à ter um melhor controle de seus dados, atravez de uma interface simples e amigavel.
#

## 1 - Descrição do Sistema:

### 1.1 Principais Funcionalidades:
° Módulo de cadastro de mercadorias: Área destinada ao cadastro de mercadoria que deram entrada na reciclagem. <br/>
° Módulo de vizualização de estoque: Área destinada há vizualizar os itens que foram comprados, junto com a quantidade e o valor da compra por unidade. <br/>
° Módulo de cadastro de funcionarios: Área destinado ao cadastro de funcionarios dentro da reciclagem, nela tem  os campos para nome, função e salário. <br/>
° Módulo de vale: Área destinada ao emprestimo de dinheiro tanto para funcionarios como para catadores, nele contem uma lista de visualização dos devedores ativos, junto com um campo para realizar o emprestimo. <br/>
° Módulo de movimentação de caixa: Área destinada há vizualização da movimentação monetária realizada em um determinado periodo de tempo escolhido.<br/>
° Módulo de desconto: Área destinada para realizar o abate do devedor que realizou o vale. <br/>
° Módulo de pesagem: Área destinada há pesagem de materiáis que derem entrada na reciclagem. <br/>
#     

## 2 - Técnologias usadas no projeto

### 2.1 Bando de Dados
Utilizado Prisma e MySQL para realizar a comunicação do banco de dados juntos com as tabelas.
#

### 2.2 BackEnd
Utilizando NestJS + TypeScript pare realizar toda a configuração do backend, junto com comunicação com banco.
#

### 2.3 FrontEnd
Utilizado o framekork ReactJS, junto com a linguagem de programação TypeScript, o builder Vite, e a biblioteca do Material UI (MUI).
#

## 3 - Clonando o repositório e instalando dependencias

Primeiro utilizando o comando **git clone** mais o endereço **SSH** ou **HTTPS**, o git vai realizar um clone do repositorio. 
Após realizar o **clone**, abra a pasta raiz do projeto e rode o comando **npm install** ou só **npm i** para instalar todas as dependencias do front-end, realizado o comando na pasta raiz do projeto, navegue até a pasta **server** e execute novamente execute o comando **npm i** para instalar as dependencias do back
-end.
#

## 4 - Executando o sistema localmente em ambiente de teste
Após realizar o clone do projeto e instalar as dependencias, tanto no front end como no back end(pasta server), execute o comando na pasta raiz **npm run dev** para startar o front-end, e dentro da pasta server execute o comando **npm run start** para startar o servidor.
O sistema irá rodar no endereço http://localhost:5173/

