const modelotabelafornecedores = require('./modelotabelafornecedores')
const Modelo = require('./modelotabelafornecedores')
const NaoEncontrado = require('../../erros/naoencontrado')

module.exports = {
    listar() {
        return Modelo.findAll({raw: true})
    },
    inserir(fornecedor) {
        return Modelo.create(fornecedor)
    },
    async pegarporid(id) {
        const encontrado = await Modelo.findOne({
            where:{
                id:id
            }
        })
        if(!encontrado){
            throw new NaoEncontrado()
        }
        return encontrado
    },
    async atualizar(id, dadosparaatualizar){
        return Modelo.update(
            dadosparaatualizar,
            {
                where:{id: id}
            }
        )
    },
    async remover(id){
        return Modelo.destroy({
            where:{
                id:id
            }
        })
    }
}

