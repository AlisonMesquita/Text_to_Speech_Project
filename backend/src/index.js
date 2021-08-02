const express = require("express");
const app = express();
const cors = require("cors");
const sql = require("./database/connection");
const textToSpeech = require("./controllers/converter");

const port = 3000; // Porta
app.use(express.json()); // Setando json como padrão
app.use(express.urlencoded({ extended: true })); // Transforma o conteúdo da requisição num objeto
app.use(cors());

// GET
app.get("/comment", (req, res) => {
	const sqlSelect = "SELECT * FROM comment;";

	sql.query(sqlSelect, (err, result) => {
        if (err) throw err;
		res.send(result);   // Retorna o resultado da operação
	});
});

// POST
app.post("/comment", async (req, res) => {
	const { message } = req.body;

	const tts = await textToSpeech.convertMessage(message); // Passa o comentário para conversão e aguarda o retorno

	const filename = tts.filename;  // Pegando o nome do arquivo gerado

	const sqlInsert = "INSERT INTO comment (message, filename) VALUES (?, ?);";

	sql.query(sqlInsert, [message, filename], (err, result) => {    // Inserindo o comentário e o nome do arquivo no banco
		if (err) throw err;
        console.log("Comment added.");
	});

	return res.status(200).json({
		message: message,
		filename: filename
	});
});

//DELETE
app.delete("/comment/:id", (req, res) => {
	let { id } = req.params;
	//console.log(id);

	let sqlDelete = "DELETE FROM comment WHERE id = ?";
	sql.query(sqlDelete, id, function (err, result) { // Deleta do banco a tupla correspondente ao ID fornecido no request
		if (err) throw err;
		console.log("Number of records deleted: " + result.affectedRows);
	});

	return res.json("Comment deleted.");
});

// Setando o 'app' para escutar todas as requisições da porta especificada (3000 nesse caso)
app.listen(port, () => {
	console.log("Listening for requests on port 3000!");
});
