const express = require("express");
const app = express();
const cors = require("cors");
const sql = require("./database/connection");
const textToSpeech = require("./controllers/converter");

const port = 3000; //porta do localhost
app.use(express.json()); //setando json como padrão
app.use(express.urlencoded({ extended: true })); //transforma o conteúdo da requisição num objeto
app.use(cors());

app.get("/comment", (req, res) => {
	const sqlSelect = "SELECT * FROM comment;";

    sql.query(sqlSelect, (err, result) => {
        res.send(result);
    })
});

app.post("/comment", async (req, res) => {
    const { message } = req.body;

    const tts = await textToSpeech.convertMessage(message);

    const filepath = tts.filepath;

    const sqlInsert = "INSERT INTO comment (message, filepath) VALUES (?, ?);";

    sql.query(sqlInsert, [message, filepath], (err, result) => {
        console.log(result);
    });

    return res.status(200).json({
        message: message,
        //uri: "audio/" + audioFile,
      })
});

//setando o 'app' para escutar todas as requisições da porta especificada (3000 nesse caso)
app.listen(port, () => {
	console.log("App de Exemplo escutando na porta 3000!");
});
