const mysql = require("mysql");
const dbConfig = require("./db.config");    // Importando o arquivo de configuração do banco

// Cria a conexão com as informações especificadas no módulo db.config
const connection = mysql.createConnection({
	host: dbConfig.HOST,
	user: dbConfig.USER,
	password: dbConfig.PASSWORD,
	database: dbConfig.DB,
});

// Abre a conexão
connection.connect((error) => {
	if (error) throw error;
	console.log("Successfully connected to the database.");

    // SQL que cria a tabela caso ela ainda não exista
	let sql = "CREATE TABLE IF NOT EXISTS comment(id int primary key auto_increment, message varchar(255) not null, filename varchar(100) not null)";
	connection.query(sql, function (err, result) {
		if (err) throw err;
		console.log("Table created or already exists!");
	});
});

module.exports = connection;
