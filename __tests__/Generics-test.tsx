/* 
    A biblioteca usada para testes em projetos com expo:
    jest-expo
    instalação: npx expo install -- --save-dev jest-expo jest @types/jest

    biblioteca usada para testar componentes React Native:
    @testing-library/react-native
    npx expo install -- --save-dev @testing-library/react-native

    Extensões usadas no vscode: 
    Jest
    Jest Runner

    Documentação referencia: https://docs.expo.dev/develop/unit-testing/
*/

/*
    Dentro desse arquivo vou criar alguns exemplos de testes genericos

    Vou apenas fazer testes em funções sincronas, ou seja,
    que não usam async await ou promises.

    Imagine essa função simples onde o usuario deve informar o ano de nascimento
    e o sistema deve retornar sua idade em anos.
    Perceba que ela tem algumas validações para previnir anos invalidos
*/

function IdadeAnos(ano: number): number | string
{
    if(ano >= new Date().getFullYear() || ano <= 1900)
    {
        return 'Ano invalido!'
    }

    return new Date().getFullYear() - ano
}
/* 
    Comando basico para iniciar o servidor de testes:
    npm run test

    Não é necessario que o projeto esteja ativo em um emulador ou celular,
    pois será criado uma execução jest a parte no sistema.
    Esse comando vai executar por padrão todos os testes escritos na pasta __tests__
*/

// Describe serve para agrupar testes sobre um mesmo assunto ou função

describe('IdadeAnos()',()=>{
    test('should have return user age in years',()=>{
        const age = IdadeAnos(1999)
        /*
            Expect é a clausula mais simples e direta do Jest, nela voce deve
            descrever exatamente oque voce quer ou não quer que aconteça
            o exemplo abaixo é: ao passar o ano eu espero que a idade
            tenha no maximo 2 digitos.
        */
        expect(age.toString().length).toBe(2)
    });
    
    test('should be a number', ()=>{
        const age = IdadeAnos(2008)

        // Testo o tipo do retorno para ver se ele é um numero ou uma string
        expect(typeof age).toBe('number')
    })

    test('should return invalid by min',()=>{
        const age = IdadeAnos(1000)

        // Passo um ano muito baixo e espero que retorne 'Ano Invalido'
        expect(age).toMatch('Ano invalido!')
    })

    test('should return invalid by max', ()=>{
        const age = IdadeAnos(2025)

        // Passo um ano muito alto e espero que retorne 'Ano Invalido'
        expect(age).toMatch('Ano invalido!')
    })
})