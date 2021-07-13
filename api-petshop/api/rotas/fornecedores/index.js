const roteador = require('express').Router()
const tabelafornecedor = require('./tabelafornecedor')
const TabelaFornecedor = require('./tabelafornecedor')
const Fornecedor = require('./fornecedor')



roteador.get('/', async (req, res)=> 
{   
    const resultados = await tabelafornecedor.listar()
    res.send(
        JSON.stringify(resultados)
    )
})

roteador.post('/', async (req, res)=> {
    const dadosrecebidos = req.body
    const fornecedor = new Fornecedor(dadosrecebidos)
    await fornecedor.criar()
    res.send(JSON.stringify(fornecedor))
})
module.exports = roteador