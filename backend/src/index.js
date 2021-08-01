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
		res.send(result);
	});
});

// POST
app.post("/comment", async (req, res) => {
	const { message } = req.body;

	const tts = await textToSpeech.convertMessage(message);

	const filename = tts.filename;

	const sqlInsert = "INSERT INTO comment (message, filename) VALUES (?, ?);";

	sql.query(sqlInsert, [message, filename], (err, result) => {
		console.log(result);
	});

	return res.status(200).json({
		message: message,
		filename: filename
	});
});

//DELETE
app.delete("/comment/:id", (req, res) => {
	let { id } = req.params;
	console.log(id);

	let sqlDelete = "DELETE FROM comment WHERE id = ?";
	sql.query(sqlDelete, id, function (err, result) {
		if (err) throw err;
		console.log("Number of records deleted: " + result.affectedRows);
	});

	return res.json("Comment deleted.");
});

// Setando o 'app' para escutar todas as requisições da porta especificada (3000 nesse caso)
app.listen(port, () => {
	console.log("App de Exemplo escutando na porta 3000!");
});
