const connection = require('../database/connection');

module.exports = {
    async index (request, response) {
        const { page = 1 } = request.query;

        /** Totalizador para ser enviado no Header */
        const [count] = await connection('incidents').count();
        
        /** Com esquema de paginação.
         * Na requisição utilizar ?page
         */
        const incidents = await connection('incidents')
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
            .limit(5)
            .offset((page - 1) * 5)
            .select([
                'incidents.*', 
                'ongs.name',
                'ongs.email',
                'ongs.whatsapp',
                'ongs.city',
                'ongs.uf'
            ]);

        response.header('X-Total-Count', count['count(*)']);

        return response.json({ incidents });
    },

    async create (request, response) {
        const { title, description, value } = request.body;
        const ong_id = request.headers.authorization;         

        /** Como foi feito um insert único, ele vai retornar um único id
         * sendo assim possível capturarlo.
         * Armazenando o primeiro valor do array na variavel id
         */
        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id,
        });

        return response.json({ id })
    },

    async delete (request, response) {
        const { id } = request.params;
        const ong_id = request.headers.authorization; 

        const incident = await connection('incidents')
            .where('id', id)
            .select('ong_id')
            .first();
            
        if (incident.ong_id !== ong_id) {
            return response.status(401).json({ error: 'Operation not permitted' }); // Nao Autorizado
        }

        await connection('incidents').where('id',id).delete();

        return response.status(204).send(); // Quando nao existe conteúdo más é uma resposta válida
    },
}