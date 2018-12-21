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
var albumID="";
var length="";

const question1 = () => {
  return new Promise((resolve, reject) => {
    rl.question('song name? ', (answer) => {
      name=answer;
      resolve()
    })
  })
}

const question2 = () => {
  return new Promise((resolve, reject) => {
    rl.question('album ID? ', (answer) => {
      albumID=answer;
      resolve()
    })
  })
}
const question3 = () => {
  return new Promise((resolve, reject) => {
    rl.question('Song Length ?', (answer) => {
      length=answer;
      var query=`INSERT INTO song ("name","songwriter_id","duration") \
      VALUES ('${name}','${albumID}','${length}')`;
        db.result(query).then(function(){
            db.many(`SELECT * FROM song WHERE name='${name}'`).then(function(column) {
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



