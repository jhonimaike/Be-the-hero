const express = require ('express');
/* módulo para controlar quem poderá acessar nossa app */
const cors = require('cors');
const routes  = require('./routes'); /*user ./ para indicar que é um arquivo  */

const app = express();

app.use(cors( 
  /**Para quando estiver em PRD 
   * {origin: 'http://meuapp.com'}
  */
));
/* para pode receber nas requisiçoes converter o JSON em objeto JavaScript
 é importante estar antes das ROTAS */
app.use(express.json());

app.use(routes);

/**
 * Método HTTP:
 *  GET: sempre para recuperar dados do back-end
 *  POST: criar informação no back-end
 *  PUT: alterar uma informação no back-end
 *  DELETE: deletar uma informação no back-end
 * 
 * É recomendável utilizar conforme a semântica
 */

 /**
  * Tipos de Parâmetros
  *  Query Params: enviados no rota apôs "?" (filtros, paginação, etc.) (Acessamos por Request.QUERY)
  *  Route Params: "/users/1" utilizados para identificar recursos (Acessamos por Request.PARAMS)
  *  Request Body:  Corpo da requisição, utilizado para criar ou alterar recursos (Acessamos por Request.BODY)
  */



/** Criando a ROTA [MOVIDO PARA ROUTES.JS] */
//   app.get('/users', (request, response) => {
//    /* return response.send('Hello World'); */
//     /* acessar parametros da requisição */
//    const params = request.query;

//    console.log(params);

//    return response.json({
//        evento: 'Semana OmniStack 11.0',
//        aluno: 'Jhoni'
//    });
// });
 
app.listen(3333);


/** Para o node ficar atualizando o servidor iremos instalar um framework 'Nodemon' 
 * é importante instalar o nodemon com '-D' para ficar como dependencia só em DEV 
 * não esquecer de definir o script no package.json 
 * "scripts": {
    "start": "nodemon index.js"
  }
 **/

 /**
 * Para conectarse a um Banco de dados, geralmente temos 3 formas
 * Driver: SELECT * FROM
 * Query Builder: table('users').select('*').where()
 * 
 * 
 * estaremos utilizando knex, o mais utilizado em Node
 * depois de instalar o knex (npm install knex ) e tbm instalar o driver 
 * do banco de dados que desejamos, para ese tutorial utilizamos sqlite3
 * Depois podemos executar o knex com npx knex init para
 * isso criar[a um arquivo na raíz do projeto ]
 * 
 * Knex tem funcionliade de migrations para histórico de tabelas criadas/alteradas
 * criamos o diretorio migrations dentro de src/database/migrations
 * alteramos o arquivos knexfile.js com 
 *   development: {
    client: 'sqlite3',
    connection: {
      filename: './src/database/db.sqlite'
    },
    migrations: {
      directory: './src/database/migrations'
    }
  }

  depois executamos npx knex migrate:make create_ongs (nome da migration) 

 * 
 */
