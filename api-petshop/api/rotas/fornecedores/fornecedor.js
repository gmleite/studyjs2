const tabelafornecedor = require('./tabelafornecedor')
const CampoInvalido = require('../../erros/campoinvalido')
const DadosNaoFornecidos = require ('../../erros/dadosnaofornecidos')


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
        this.validar()
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

    async carregar() {
        const encontrado = await tabelafornecedor.pegarporid(this.id)
        this.empresa = encontrado.empresa
        this.email = encontrado.email
        this.categoria = encontrado.categoria
        this.dataAtualizacao = encontrado.dataAtualizacao
        this.dataCriacao = encontrado.dataCriacao
        this.versao = encontrado.versao
    }
    async atualizar(){
        await tabelafornecedor.pegarporid(this.id)
        const campos = ['empresa', 'email', 'categoria']
        const dadosparaatualizar = {}
        
        campos.forEach((campo)=>{
            const valor = this[campo]

            if(typeof valor === 'string' && valor.length > 0){
                dadosparaatualizar[campo] = valor
                
            }
        })

        if(Object.keys(dadosparaatualizar).length === 0){
            throw new DadosNaoFornecidos()
        }
        await tabelafornecedor.atualizar(this.id, dadosparaatualizar)
    }
    async remover(){
        return tabelafornecedor.remover(this.id)
    }
    async validar(){
        const campos = ['empresa','email','categoria']

        campos.forEach(campo=>{
            const valor = this[campo]

            if(typeof valor !== 'string' || valor.lenght === 0){
                throw new CampoInvalido(campo)
            }
        })

        
    }
}


module.exports = Fornecedor