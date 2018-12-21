var express = require('express');
var app = express();
const bodyParser = require('body-parser');
let promise = require('bluebird');
const readline= require('readline');

const initOptions = {
  promiseLib: promise
};

const pgp = require('pg-promise')(initOptions);

// Database connection parameters:
const config = {
  host: 'localhost',
  port: 5432,
  database: 'music',
  user: 'postgres'
};

// call our config file
const db = pgp(config);


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var name="";
var year="";
var artist_id="";

const question1 = () => {
  return new Promise((resolve, reject) => {
    rl.question('Album name? ', (answer) => {
      name=answer;
      resolve()
    })
  })
}

const question2 = () => {
  return new Promise((resolve, reject) => {
    rl.question('Album year? ', (answer) => {
      year=answer;
      resolve()
    })
  })
}
const question3 = () => {
  return new Promise((resolve, reject) => {
    rl.question('Artist ID ?', (answer) => {

      artist_id=answer;

      var query=`INSERT INTO albums ("name","year","artist_id") \
      VALUES ('${name}','${year}','${artist_id}')`;

    

      db.result(query).then(function(){
        db.many(`SELECT * FROM albums WHERE name='${name}'`).then(function(column) {
        console.log("Created album with ID "  + column[0].id );
      });
      });
      
      
      resolve()
    })
  });
}

const main = async () => {
  await question1()
  await question2()
  await question3()
  rl.close()
  
}

main();



