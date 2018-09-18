const pg = require('pg');
const settings = require('./settings'); // settings.json

const client = new pg.Client({
  user: settings.user,
  password: settings.password,
  database: settings.database,
  host: settings.hostname,
  port: settings.port,
  ssl: settings.ssl,
});

const query = 'SELECT * FROM famous_people WHERE first_name LIKE $1 OR last_name LIKE $1';
const queryParams = process.argv.slice(2);
 
function displayPeople(people, queryName) {
  console.log(`${people.length} person(s) found by the name '${queryName}'`);
  let index = 1;
  people.forEach((person) => {
    console.log(`- ${index}: ${person.first_name} ${person.last_name}, born '${person.birthdate.toISOString().slice(0, 10)}'`);
    index += 1;
  });
}

client.connect((err) => {
  if (err) {
    return console.error('Connection Error', err);
  }
  client.query(query, queryParams, (err, result) => {
    if (err) {
      return console.error('error running query', err);
    }
    if (result.rows.length > 1) {
      displayPeople(result.rows, queryParams);
    } else {
      console.log('Nobody found with that name.')
    }
    client.end();
  });
});
