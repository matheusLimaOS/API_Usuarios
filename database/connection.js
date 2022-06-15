let knex = require('knex')({
    client: 'mysql2',
    connection: {
      host : 'localhost',
      user : 'root',
      password : '15937525',
      database : 'aula_node'
    }
  });

module.exports = knex
