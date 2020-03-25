const connection = require('../database/connection');

/** Para seguir a serio a metodologia do MVC, nao devemos listar mais de 5
 * métodos por controller, entao utilizamos o profile controller para
 * devolver dados específicos de uma ONG
 */
module.exports = {
    async index (request, response) {
        const ong_id = request.headers.authorization;

        const incidents = await connection('incidents')
            .where('ong_id', ong_id)
            .select('*');

        return response.json({ incidents });
    }
}