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


const question1 = () => {
    return new Promise((resolve, reject) => {
      rl.question('Artist name ?', (answer) => {
        name=answer;
        var query=`INSERT INTO artist ("name") \
        VALUES ('${name}')`;
            db.result(query).then(function(){
            db.query(`SELECT id FROM artist WHERE name='${name}'`).then(function(column) {
            console.log("Created artist with ID "  + column[0].id );
            });
            });
        resolve()
      })
    });
  }



const main = async () => {
  await question1()
  
  rl.close()
  
}

main();



