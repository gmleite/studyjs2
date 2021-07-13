const roteador = require('express').Router()
const tabelafornecedor = require('./tabelafornecedor')
const TabelaFornecedor = require('./tabelafornecedor')
const Fornecedor = require('./fornecedor')



roteador.get('/', async (req, res)=> 
{   
    const resultados = await tabelafornecedor.listar()
    res.status(200)
    res.send(
        JSON.stringify(resultados)
    )
})

roteador.post('/', async (req, res)=> {
    try {
    const dadosrecebidos = req.body
    const fornecedor = new Fornecedor(dadosrecebidos)
    await fornecedor.criar()
    res.status(201)
    res.send(JSON.stringify(fornecedor))
    }catch(erro){
        
        res.send(JSON.stringify({mensagem: erro.message}))
    }
})

roteador.get('/:idFornecedor', async (req, res) => {
    try{
    const id = req.params.idFornecedor
    const fornecedor = new Fornecedor({ id: id })
    await fornecedor.carregar()
        res.status(200)
        res.send(
            JSON.stringify(fornecedor)
        )
    }catch(erro){
        res.send(JSON.stringify({mensagem: erro.message}))
    }
})

roteador.put('/:idFornecedor', async (req,res)=>{
    try{
    const id = req.params.idFornecedor
    const dadosrecebidos = req.body
    const dados = Object.assign({}, dadosrecebidos, { id:id })
    const fornecedor = new Fornecedor(dados)
    await fornecedor.atualizar()
    res.status(204)
    res.end()
    
    }catch(erro){
        res.send(JSON.stringify({mensagem:erro.message}))
    }

})

roteador.delete('/:idFornecedor', async (req, res)=> {
    
    try{
        const id = req.params.idFornecedor
        const fornecedor = new Fornecedor({id:id})
        await fornecedor.carregar()
        await fornecedor.remover()
        res.status(204)
        res.end()

    }catch(erro){
        res.send(JSON.stringify({mensagem: erro.message}))
    }
    
})

module.exports = roteador
