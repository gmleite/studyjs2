class CampoInvalido extends Error{
    constructor(campo){
        const mensagem = 'Um ou mais campos estao invalidos.'
        super(mensagem)
        this.name = 'CampoInvalido'
        this.idErro = 1
    }
}

module.exports = CampoInvalido