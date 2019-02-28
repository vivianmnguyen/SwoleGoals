// run this
//./cloud_sql_proxy -instances=swolegoalsdatabase:us-central1:swolegoalsdb=tcp:3307
// make sure you have node mysql installed with "npm install mysql"
// run this as "node server.js"

const express = require('express');

var app = express();

var bodyparser = require('body-parser');
var cors = require('cors');//cors is used to allow cross platform services
app.use(cors());
app.use(bodyparser.json());

var mysql = require('mysql');	
var mysqlConn = mysql.createConnection({
     //host     : 'localhost',
     //port     : 3307,
     user     : 'root',
     password : 'swolegoals',
     //database : 'user',
     database : 'exercises',
     socketPath : '/cloudsql/swolegoalsdatabase:us-central1:swolegoalsdb'
});


mysqlConn.connect(function(err) {
  if (err){
    console.log("mysql connect failed \n Error:" + JSON.stringify(err, undefined, 2));
  }else{
    console.log("mysql connect successfully.");
  }
});


app.get('/', (req, res) => {
  res.send("Hello from SwoleGoals!")
});


//get User

app.get('/getUser', (req, res) => {
  mysqlConn.query("select * from users", (err, results, fields) => {
    if (err){
      console.log(err);
    }else{
      console.log("get successfully.");
      res.send(results);
    }
  })
});



// get all info from exercises
app.get('/getEx', (req, res) => {
  mysqlConn.query("select * from bodybuilding_exercises", (err, results, fields) => {
    if (err){
      console.log(err);
    }else{
      console.log("get successfully.");
      res.send(results);
    }
  })
});



/*
app.post('/postUser', (res, req) => {

});
*/

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
