const modeloTabela = require('../rotas/fornecedores/modelotabelafornecedores')

modeloTabela
    .sync()
    .then(() => console.log('tabela criada com sucesso'))
    .catch(console.log)
