document.getElementById('btn').addEventListener('click', (e) => {
    e.preventDefault();
    const input = document.getElementById('newComment').value;
    //console.log(input);

    let comment = {
        message: input
    }
    console.log(comment);

    fetch('http://localhost:3000/comment/', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(comment)
    })
    .then(res => {
        if (res.ok) 
        renderComments();   // Renderiza os comentários salvos no banco
    })
})

//  GET nos comentários
async function getComments() {
    let url = 'http://localhost:3000/comment/';

    try {
        let res = await fetch(url); // realiza um GET no url especificado
        return await res.json();    // retorna o resultado da operação
    }
    catch(error) {
        console.log(error);
    }
}

async function renderComments() {
    let comments = await getComments();
    let html = '';
    comments.forEach(comment => {
        let htmlSegment = `<div class="comment">
                            <p>${comment.message}</p>
                            <input type="button" id="btn-listen" value="Ouvir" onclick="justAlert()">
                        </div>`;
        
        html += htmlSegment;
    });

    
    let container = document.querySelector('.container');
    container.innerHTML = html;
}

function justAlert() {
    window.alert("Ouvindo");
}

// Ao carregar a página irá renderizar os comentários armazenados no banco (se existirem)
window.onload = function() {
    renderComments();
};