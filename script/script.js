const div = document.querySelector("#content");

const titulo = document.querySelector("#titulo");
const link = document.querySelector("#link");
const redacao = document.querySelector("#redacao");
const img = document.querySelector(".background");
const enviar = document.querySelector("#enviar");

const tituloE = document.querySelector("#tituloE");
const linkE = document.querySelector("#linkE");
const redacaoE = document.querySelector("#redacaoE");

let idtarget = 0;
let recarregar = false;

const modal = document.querySelector("#modal");
const clsModal = document.querySelector("#enviarE");

// Função assíncrona para carregar modelos
async function carregarModelos() {
    
    div.innerHTML = ''; // Limpa o conteúdo atual

    try {
        const resposta = await fetch("http://192.168.1.36:3000/modelos");
        if (resposta.status === 200) {
            const dados = await resposta.json();
            dados.map((dados) => {
                const card = document.createElement('div');
                card.className = 'card';

                const img = document.createElement('img');
                img.src = dados.imagem;
                card.appendChild(img);
                img.className = 'cover';

                const h1 = document.createElement('h1');
                h1.textContent = dados.titulo;
                card.appendChild(h1);

                const description = document.createElement('p');
                let texto = dados.corpo_redacao;

                // Limitar a 500 caracteres e adicionar "..."
                if (texto.length > 500) {
                texto = texto.substring(0, 500) + '...';
                }

                description.textContent = texto;
                card.appendChild(description);

                const button = document.createElement('button');
                button.textContent = 'EDITAR';
                button.className = "editar";

                const buttondel = document.createElement('button');
                buttondel.textContent = 'EXCLUIR';
                buttondel.id = dados.id;

                buttondel.addEventListener("click", async () => {

                    const resultado = confirm("Você deseja excluir esse modelo?");
        
                    if (resultado) {
            
                        idtarget = dados.id;

                        const resposta = await fetch(`http://192.168.1.36:3000/deletar/${idtarget}`, {
                            method: 'DELETE',
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        });
    
                        if (resposta.status === 200) {
                            await carregarModelos(); // Recarrega a lista após a exclusão
                        } else {
                            console.log(await resposta.json());
                        }
            
                    }
                   
                });

                button.addEventListener("click", () => {
                    modal.showModal();
                    tituloE.value = dados.titulo;
                    linkE.value = dados.imagem;
                    redacaoE.value = dados.corpo_redacao;
                    idtarget = dados.id;
                });

                modal.addEventListener("click", (event) => {
                    if (event.target === modal) {
                        modal.close();
                    }
                });

                card.append(img, h1, description, button, buttondel);
                div.append(card);
            });
        }
    } catch (error) {
        console.error("Erro ao carregar os modelos:", error);
    }
}

window.onload = carregarModelos;

// Função assíncrona para enviar um novo modelo
enviar.addEventListener("click", async () => {

    const resposta = await fetch("http://192.168.1.36:3000/novomodelo", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "imagem": link.value,
            "titulo": titulo.value,
            "corpo_redacao": redacao.value
        })
    });

    if (resposta.status === 200) {
        await carregarModelos(); // Recarrega a lista após o envio de um novo item
    } else {
        console.log(await resposta.json());
    }
    carregarModelos();

});

// Função assíncrona para editar o modelo
clsModal.addEventListener("click", async () => {

    const resultado = confirm("Alterar modelo existente?");
    
    if (resultado) {
        const resposta = await fetch(`http://192.168.1.36:3000/editar/${idtarget}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "imagem": linkE.value,
                "titulo": tituloE.value,
                "corpo_redacao": redacaoE.value
            })
        });
    
        if (resposta.status === 200) {
            await carregarModelos(); // Recarrega a lista após a edição
        } else {
            console.log(await resposta.json());
        }
    
        carregarModelos();
        modal.close();
    }


});

// Atualiza a imagem ao inserir um link
const textarea = document.querySelector("#link");
const image = document.querySelector("#image");

textarea.addEventListener("input", () => {
    image.src = textarea.value || "../image/cover.jpg";
});
