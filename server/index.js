const pg = require('pg');
var fs = require('fs');
const db = require('../config');



// pool takes the object above -config- as parameter
const pool = new pg.Pool(db);

var sql = fs.readFileSync('./database/products.sql').toString();
//console.log(sql)

pool.connect(function(err, client, done){
    if (err){
        console.log('error: ', err);
        process.exit(1);
    }

        client.query(sql, function(err, result){
        if(err){
            console.log('error: ', err);
            process.exit(1);
        }
        process.exit(0);
        done();
    });
});