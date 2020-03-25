const knex = require('knex');
const configuration = require('../../knexfile');

/**Escolhendo a conexão que está definida do knexfile.js */
const connection = knex(configuration.development);

module.exports = connection;