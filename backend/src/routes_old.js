const express = require('express');

/** Criptografia para gerar ID aleatorio */
const crypto = require('crypto');

const connection = require('./database/connection');

/**desacoplando o módulo de rotas do express em uma VAR */
const routes = express.Router();

routes.get('/ongs', async (request, response) => {
    const ongs = await connection('ongs').select('*');

    return response.json({ongs});
});

routes.post('/ongs', async (request, response) => {
    /* return response.send('Hello World'); */
     /* acessar parametros da requisição */
    /*const data = request.body;*/

    const {name, email, whatsapp, city, uf} = request.body;

    /** Vai gerar um ID hexadecimal com crypto */
    const id = crypto.randomBytes(4).toString('HEX');
 
    /** como esse insert pode demorar um pouquinho, podemos definir um async na função dentro do post
     * e um await antes do connection, para que ele espere até terminar o insert e aí recém enviar o
     * console log
     */
    await  connection('ongs').insert({
        id,
        name, 
        email,
        whatsapp,
        city,
        uf,
    })

    //console.log(data);
 
    return response.json(
        /*{
        evento: 'Semana OmniStack 11.0',
        aluno: 'Jhoni'
    }*/
    /** devolvendo somente o Id depois de realziado o insert */
     {id}
    );
 });

 /**exportando variáveis */
 module.exports = routes;