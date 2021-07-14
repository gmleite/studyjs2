const roteador = require('express').Router()
const tabelafornecedor = require('./tabelafornecedor')
const TabelaFornecedor = require('./tabelafornecedor')
const Fornecedor = require('./fornecedor')
const NaoEncontrado = require('../../erros/naoencontrado')
const SerializadorFornecedor = require('../../serializador').SerializadorFornecedor
const { response } = require('express')




roteador.get('/', async (req, res)=> 
{   
    const resultados = await tabelafornecedor.listar()
    res.status(200)
    const serializador = new SerializadorFornecedor(
        res.getHeader('Content-Type')
    )
    res.send(
        serializador.serializar(resultados)
    )
})

roteador.post('/', async (req, res, proximo)=> {
    try {
    const dadosrecebidos = req.body
    const fornecedor = new Fornecedor(dadosrecebidos)
    await fornecedor.criar()
    res.status(201)
    const serializador = new SerializadorFornecedor(
        res.getHeader('Content-Type')
    )
    res.send(serializador.serializar(fornecedor))
    }catch(erro){
        proximo(erro)
    }
})

roteador.get('/:idFornecedor', async (req, res, proximo) => {
    try{
    const id = req.params.idFornecedor
    const fornecedor = new Fornecedor({ id: id })
    await fornecedor.carregar()
        res.status(200)
        const serializador = new SerializadorFornecedor(
            res.getHeader('Content-Type'),
            camposextras =['email','dataCriacao','dataAtualizacao','versao']
        )
        res.send(serializador.serializar(fornecedor))
    }catch(erro){
        proximo(erro)
    }
})

roteador.put('/:idFornecedor', async (req,res, proximo)=>{
    try{
    const id = req.params.idFornecedor
    const dadosrecebidos = req.body
    const dados = Object.assign({}, dadosrecebidos, { id:id })
    const fornecedor = new Fornecedor(dados)
    await fornecedor.atualizar()
    res.status(204)
    res.end()
    
    }catch(erro){
        proximo(erro)
    }

})

roteador.delete('/:idFornecedor', async (req, res, proximo)=> {
    
    try{
        const id = req.params.idFornecedor
        const fornecedor = new Fornecedor({id:id})
        await fornecedor.carregar()
        await fornecedor.remover()
        res.status(204)
        res.end()

    }catch(erro){
        proximo(erro)
    }
    
})

module.exports = roteador

