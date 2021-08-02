# Text_to_Speech_Project
## Description

Desafio do processo seletivo da Smarkio para converter comentário em áudio utilizando a API Text to Speech do IBM Watson.

## Getting Started

### Dependencies

* Node.js instalado na máquina
* MySQL instalado na máquina

### Installing

* Após baixar (ou clonar) o projeto, entre no diretório 'backend' e abra um terminal dentro desse diretório, em seguida execute "npm install" para instalar todas as dependências de projeto (Express, MySQL, Nodemon, IBM-Watson e CORS). 
* Antes de executar o projeto é necessário configurar também o banco de dados MySQL (lembrando também que o serviço do MySQL precisa estar em execução durante todo o processo), então crie uma database com o seguinte nome 'smarkio', caso tenha algum problema na configuração do banco confira o arquivo de setup do banco [aqui](https://github.com/AlisonMesquita/Text_to_Speech_Project/blob/main/backend/src/database/db.config.js). Lembrando que as informações do arquivo em questão podem ser alteradas para realizar a conexão de uma forma diferente.

### Executing program

* Após seguir as etapas de instalação do projeto, entre no diretório 'backend' e abra um terminal dentro desse diretório, em seguida execute "npm start" para iniciar o projeto, uma mensagem aparecerá indicando que o servidor está escutando requisições na porta 3000.
* Com o banco de dados configurado e o servidor no ar, abra o arquivo 'index.html' localizado dentro do diretório 'frontend', inicialmente temos apenas um campo para inserir uma mensagem e o botão de cadastro. Após o primeiro cadastro ser realizado o comentário salvo aparecerá à direita do campo de texto, junto do comentário temos uma opção para ouvir a conversão realizada pela API Text to Speech do IBM Watson, e também temos um ícone para deletar o comentário em questão (o áudio gerado continuará dentro do diretório 'public').

## Help

Caso tenha algum problema durante a execução do projeto verifique se o 'backend' foi executado da maneira correta e se a mensagem de sucesso foi exibida no console, verifique também se o serviço do MySQL está em execução na máquina e se a database foi criada (a tabela utilizada é criada após executar 'npm start').
