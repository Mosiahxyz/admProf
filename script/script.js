
const div = document.querySelector("#content");

const titulo = document.querySelector("#titulo");
const link = document.querySelector("#link");
const redacao = document.querySelector("#redacao");
const img = document.querySelector(".background");
const enviar = document.querySelector("#enviar");

let idtarget = 0;

window.onload = function(){

fetch("http://192.168.1.36:3000/modelos").then((resposta)=>{
    
    if(resposta.status == 200){
        resposta.json().then((dados)=>{

            //dados é a lista de objetos que vem da api

            dados.map((dados)=>{
                const card = document.createElement('div');
                card.className = 'card';

    
                    const img = document.createElement('img');
                    img.src = dados.imagem; // Troque para a imagem do modelo se disponível
                    card.appendChild(img);
                    img.className = 'cover';

                    const h1 = document.createElement('h1');
                    h1.textContent = dados.titulo; 
                    card.appendChild(h1);
    
                    const description = document.createElement('p');
                    description.textContent = dados.corpo_redacao;
                    card.appendChild(description);
    
                    const button = document.createElement('button');
                    button.textContent = 'EDITAR';
                    button.id = dados.id;

                    const buttondel = document.createElement('button');
                    buttondel.textContent = 'EXCLUIR';
                    buttondel.id = dados.id;
    
                    card.append(img, h1, description, button, buttondel);
                    div.append(card);

                    //pegar a redação
                    button.addEventListener('click', function() {
                
                        if(dados.imagem == null){
                            img.src = "https://i.pinimg.com/originals/cf/6e/63/cf6e63b457348e1e534d95acd1e8341c.jpg"
                        }
                        else{
                            img.src = dados.imagem
                        }

                        titulo.textContent = dados.titulo;
                        link.textContent = dados.imagem;
                        redacao.textContent = dados.corpo_redacao;
                        idtarget = dados.id


                    });
                    
                    //editar a redação
                    enviar.addEventListener("click",()=>{

                        fetch(`http://192.168.1.36:3000/editar/${idtarget}`,{
                            method: 'PUT',
                            headers: {
                                'Content-Type' : 'application/json'
                            },            
                            body: JSON.stringify({
                                "imagem" : link.value,
                                "titulo": titulo.value,
                                "corpo_redacao": redacao.value
                            })
                            }).then((resposta)=>{
                                if(resposta.status != 200){
                                    console.log(resposta.json())
                            }
                        })
                    })
            })

        })


    }
})
}

link.on('change keyup paste click', function() {
                
    img.src = link;

});
