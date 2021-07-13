const tabelafornecedor = require('./tabelafornecedor')


class Fornecedor {
    constructor({  id, empresa, email, categoria, dataCriacao, dataAtualizacao, versao  }) {
        this.id = id
        this.empresa = empresa
        this.email = email
        this.categoria = categoria
        this.dataAtualizacao = dataAtualizacao
        this.dataCriacao = dataCriacao
        this.versao = versao
    }
    async criar () {
        const resultado = await tabelafornecedor.inserir({
            empresa: this.empresa,
            email: this.email,
            categoria: this.categoria
        })
        this.id = resultado.id
        this.dataCriacao = resultado.dataCriacao
        this.dataAtualizacao = resultado.dataAtualizacao
        this.versao = resultado.versao
    }
}


module.exports = Fornecedor