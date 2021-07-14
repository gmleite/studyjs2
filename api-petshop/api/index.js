const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const config = require('config')
const roteador = require('./rotas/fornecedores')
const NaoEncontrado = require('./erros/naoencontrado')
const CampoInvalido = require('./erros/campoinvalido')
const DadosNaoFornecidos = require('./erros/dadosnaofornecidos')
const ValorNaoSuportado = require('./erros/valornaosuportado')
const formatosaceitos = require('./serializador').formatosaceitos
const SerializadorErro = require('./serializador').SerializadorErro


app.use(bodyParser.json())

app.use((req, res, proximo)=>{
    let formatorequisitado = req.header('Accept')

    if(formatorequisitado === '*/*'){
        formatorequisitado = 'application/json'
    }

    if(formatosaceitos.indexOf(formatorequisitado) === -1){
        res.status(406)
        res.end()
        return
    }
    res.setHeader('Content-type', formatorequisitado)
    proximo()

})

app.use('/api/fornecedores', roteador)

app.listen(config.get('api.porta'), () => console.log('API Rodando'))

app.use((erro, req, res, proximo) => {
    let status = 500
    if(erro instanceof NaoEncontrado){
        status = 404
    }if(erro instanceof CampoInvalido || erro instanceof DadosNaoFornecidos){
        status = 400
    }
    if(erro instanceof ValorNaoSuportado){
        status = 406
    }  
    const serializador = new SerializadorErro(res.getHeader('Content-Type'))
    res.status(status)
    res.send(serializador.serializar({
        mensagem: erro.message,
        id: erro.idErrro
    }))
    
    
})



