var express = require('express')
var app = express()
const {port} = require('../config');
const controllers = require('../database/controllers.js');


// Start server and listen on port 
app.listen(port, function () {
    console.log(`listening on port ${port}`);
}); 



app.get('/products', async (req, res) => {
    if ('page' in req.query || 'count' in req.query || Object.keys(req.query).length === 0) {
        const products = await controllers.getProducts(req.query)
        res.status(200).json(products)
    } else {
        res.status(400).send({
        message: 'This is not a valid route!'
        });
    }
})
