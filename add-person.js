const pg = require('pg');
const settings = require('./settings'); // settings.json

const knex = require('knex')({
  client: 'pg',
  version: '7.2',
  connection: {
    host : settings.hostname,
    user : settings.user,
    password : settings.password,
    database : settings.database,
  }
});

const insertParams = process.argv.slice(2);

knex.insert({
  first_name: insertParams[0],
  last_name: insertParams[1],
  birthdate: insertParams[2],
}).into('famous_people')
.then(function(item) {
  console.log(`${insertParams[0]} ${insertParams[1]} added`);
  knex.destroy();
});