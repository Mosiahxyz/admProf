import axios from 'axios'

/*
    LEIA ------------- IMPORTANTE ------------------ LEIA
    A biblioteca axios é uma popular biblioteca TS(JS) pra fazer requisições HTTP(S). 
    Ela funciona tanto no navegador quanto no Node.js e é bastante utilizada 
    em projetos front-end e back-end.
    Em um sistema de verdade, como regra, não disperdiçamos memória,
    seguindo essa lógica, nunca é legal quando voce cria repetidamente um mesmo
    objeto ou repete blocos de código em varios lugares sem motivo.
    Para facilitar a manutenção e ajustes, eu crio apenas uma instancia do axios
    para todo o projeto e exporto ela para o resto.
    Nesse caso mais basico, eu estou passando apenas a URL basica, porem futuramente
    eu vou adicionar mais configurações aqui.
*/

export const apiConfig = axios.create({
    baseURL : 'http://192.168.1.36:3000'
})