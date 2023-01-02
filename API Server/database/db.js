const { Client } = require('pg')
const {db} = require('../config');
const Products = new Client(db)


Products.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});


module.exports = Products;