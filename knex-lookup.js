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

const queryParams = process.argv.slice(2);
 
function displayPeople(people, queryName) {
  console.log(`${people.length} person(s) found by the name '${queryName}'`);
  let index = 1;
  people.forEach((person) => {
    console.log(`- ${index}: ${person.first_name} ${person.last_name}, born '${person.birthdate.toISOString().slice(0, 10)}'`);
    index += 1;
  });
}

knex.select('*').from('famous_people')
.where('first_name', 'like', queryParams[0])
.orWhere('last_name', 'like', queryParams[0])
.asCallback(function(err, rows) {
  if (err) return console.error(err);
  displayPeople(rows, queryParams[0]);
  knex.destroy();
});


