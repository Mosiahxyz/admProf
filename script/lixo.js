
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