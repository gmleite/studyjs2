const ValorNaoSuportado = require("./erros/valornaosuportado")

class Serializador{
    json (dados){
        return JSON.stringify(dados)
    }
    serializar (dados){
        if(this.contentType === 'application/json'){
            return this.json(
                this.filtrar(dados)
            )
        }else{
            throw new ValorNaoSuportado(this.contentType)
        }}
        
        
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

        this.campospublicos =['id', 'empresa', 'categoria'].concat(camposextras||[])
        this.contentType = contentType

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
    }
}

module.exports = {
    SerializadorFornecedor: SerializadorFornecedor,
    Serializador: Serializador,
    SerializadorErro: SerializadorErro,
    formatosaceitos: ['application/json']
}
