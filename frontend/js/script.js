document.getElementById("btn").addEventListener("click", (e) => {
	e.preventDefault();
	let input = document.getElementById("newComment").value;
	//console.log(input);

	if (input === "") {
		window.alert("Não é possível enviar comentários em branco.");
		return;
	}

	let comment = {
		message: input,
	};
	console.log(comment);

	fetch("http://localhost:3000/comment/", {
		method: "post",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(comment),
	}).then((res) => {
		if (res.ok) renderComments(); // Chama a function que renderiza os comentários salvos no banco
	});
});

// GET nos comentários
async function getComments() {
	let url = "http://localhost:3000/comment/";

	try {
		let res = await fetch(url); // Realiza um GET no url especificado
		return await res.json(); // Retorna o resultado da operação
	} 
    catch (error) {
		console.log(error);
	}
}

// Renderizando dinamicamente os comentários na tela
async function renderComments() {
	let comments = await getComments();
	let html = "";
	
	comments.forEach((comment) => {		
		let filePath = `./public/audio/${comment.filename}`;
        //console.log(filePath);
		let htmlSegment = `<div class="comment" id="${comment.id}">
                                <div class="comment-box">
                                    <p>${comment.message}</p>
                                    <audio controls id="music">
                                    <source src="${filePath}" type="audio/wav">
                                    Your browser does not support the audio element.
                                    </audio>
                                </div>
                                <i class="fa fa-trash" <input type="button" id="btn-del" onClick="deleteComment(${comment.id})"></i>
                            </div>`;
		
		html += htmlSegment;
	});

	let container = document.querySelector(".container"); // Busca a div onde será inserido o(s) comentário(s)
	container.innerHTML = html; // Adiciona o HTML gerado no forEach
}

async function deleteComment(id) {
	await fetch("http://localhost:3000/comment/" + id, {
		method: "delete",
	}).then((res) => {
		if (res.ok) {
			//return res.json();
			console.log("Comment deleted.");
			renderComments();
		}
	});
}

// Ao carregar a página irá renderizar os comentários armazenados no banco (se existirem)
window.onload = function () {
	renderComments();
};
