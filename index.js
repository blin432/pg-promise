var express = require('express');
var app = express();
const bodyParser = require('body-parser');
let promise = require('bluebird');

const initOptions = {
  promiseLib: promise
};

const pgp = require('pg-promise')(initOptions);





// Database connection parameters:
const config = {
  host: 'localhost',
  port: 5432,
  database: 'restaurants',
  user: 'postgres'
};
// call our config file
const db = pgp(config);

// RUN SOME SQL!
// Get everything!
// db.result('SELECT * FROM restaurants').then(function(results) {
//   results.forEach(function(column) {
//     console.log(column.restaurant_id, column.name);
//   });
// });

// // Example of getting a search paramater!
// db.one("SELECT * FROM restaurants WHERE name='Ecco' ").then(function(column) {
//   console.log(column.restaurant_id, column.name, column.catergory);
// });


// var stars =3 ;
// var query= `INSERT INTO restaurants ("stars") \
// VALUES ('${stars}')`;
// db.result(query)
// .then(function(result){
//     console.log(result);
// });

