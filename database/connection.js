let knex = require('knex')({
    client: 'mysql2',
    connection: {
      host : 'localhost',
      user : 'root',
      password : '159375',
      database : 'aula_node'
    }
  });

module.exports = knex
