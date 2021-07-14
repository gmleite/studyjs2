class ValorNaoSuportado extends Error{
    constructor(contentType){
        super(`Nao suportamos o tipo de conteudo, ${contentType} nao eh suportado`)
        this.name = 'valornaosuportado'
        this.idErro = 3
    }
}

module.exports = ValorNaoSuportado