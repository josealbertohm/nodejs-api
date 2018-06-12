var express = require('express');
var app = express();

var mysql = require("mysql");

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').load();
}

const PORT = process.env.SERVER_PORT || 8000;

//Database pool connection manager
var pool      =    mysql.createPool({
    connectionLimit : 10,
    host     : process.env.DB_HOST,
    user     : process.env.DB_USER,
    password : process.env.DB_PASS,
    database : process.env.DB_NAME,
    debug    : process.env.DB_DEBUG 
});

function readAllCharacterData(req, res) {
    pool.getConnection(function(err, connection){
        if (err) {
          res.json({"code" : 100, "status" : "Error in connection database"});
          return;
        }   
        
        connection.query("select * from characters_tbl order by full_name",function(err,rows) {
            connection.release();
            if(!err) {
                res.json(rows);
            }           
        });

        connection.on('error', function(err) {      
              res.json({"code" : 100, "status" : "Error in connection database"});
              return;     
        });
  });
}

function readCharacterData(req, res) {
    pool.getConnection(function(err, connection){
        if (err) {
          res.json({"code" : 100, "status" : "Error in connection database"});
          return;
        }   
        var character_id = req.params.id;
        connection.query("select * from characters_tbl where id=" + character_id,function(err,rows) {
            connection.release();
            if(!err) {
                res.json(rows);
            }           
        });

        connection.on('error', function(err) {      
              res.json({"code" : 100, "status" : "Error in connection database"});
              return;     
        });
  });
}

app.use(function(req, res, next){
	next();
});

app.get('/api/v1.0/characters', function (req, res) {
    readAllCharacterData(req, res);
})

app.get('/api/v1.0/character/:id', function (req, res) {
    readCharacterData(req, res);
})

var server = app.listen(PORT, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("API REST listening at http://%s:%s", host, port)
})