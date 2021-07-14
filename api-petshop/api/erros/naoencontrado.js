class NaoEncontrado extends Error{
    constructor (){
        super('Fornecedor nao encontrado.')
        this.name = 'Nao encontrado'
        this.idErro = 0

    }
    
}
module.exports = NaoEncontrado