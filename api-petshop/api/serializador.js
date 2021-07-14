const ValorNaoSuportado = require("./erros/valornaosuportado")
const jsontoxml = require('jsontoxml')

class Serializador{
    json (dados){
        return JSON.stringify(dados)
    }
    xml(dados){
        let tag = this.tagSingular

        if(Array.isArray(dados)){
            tag = this.tagPlural
            dados = dados.map((item)=>{
                return {[this.tagSingular]: item}
            })
        }

        return jsontoxml({[tag]:dados})
    }


    serializar (dados){
        dados = this.filtrar(dados)

        if(this.contentType === 'application/json'){
            return this.json(dados
            )
        }
        if(this.contentType === 'application/xml'){
            return this.xml(dados)
            
        }
            throw new ValorNaoSuportado(this.contentType)
    }
        
        
        filtrarObjeto(dados){
            const novoobjeto = {}
            this.campospublicos.forEach((campo)=>{
                if(dados.hasOwnProperty(campo)){
                    novoobjeto[campo] = dados[campo]
                }
            })
            return novoobjeto
            
        }
        
        filtrar(dados){
            if(Array.isArray(dados)){
                dados = dados.map(item => {return this.filtrarObjeto(item)})
            }else{
                dados=this.filtrarObjeto(dados)
            }

            return dados
        }

}


class SerializadorFornecedor extends Serializador{
    constructor(contentType, camposextras){
        super()
        this.contentType = contentType

        this.campospublicos =['id', 'empresa', 'categoria'].concat(camposextras||[])
        this.tagSingular = 'fornecedor'
        this.tagPlural = 'fornecedores'

    }
}

class SerializadorErro extends Serializador{
    constructor(contentType, camposextras){
        super()
        this.contentType = contentType
        this.campospublicos = [
            'mensagem',
            'id'
        ].concat(camposextras || [])
        this.tagSingular = 'erro'
        this.tagPlural = 'erros'
    }
}

module.exports = {
    SerializadorFornecedor: SerializadorFornecedor,
    Serializador: Serializador,
    SerializadorErro: SerializadorErro,
    formatosaceitos: ['application/json', 'application/xml']
}
