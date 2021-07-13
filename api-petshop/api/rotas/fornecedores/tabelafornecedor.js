const Modelo = require('./modelotabelafornecedores')

module.exports = {
    listar() {
        return Modelo.findAll()
    },
    inserir(fornecedor) {
        return Modelo.create(fornecedor)
    }
}

