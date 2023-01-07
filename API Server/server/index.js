var express = require("express");
var app = express();
const { port } = require("../config");
const controllers = require("../database/controllers.js");

// Start server and listen on port
app.listen(port, function () {
  console.log(`listening on port ${port}`);
});

app.get("/products", async (req, res) => {
  const products = await controllers.getProducts(req.query);
  res.status(200).json(products);
});

app.get("/products/:id", async (req, res) => {
  const productInformation = await controllers.getProductInformation(
    req.params.id
  );
  res.status(200).json(productInformation);
});

app.get("/products/:id/styles", async (req, res) => {
  const styles = await controllers.getStyles(req.params.id);
  res.status(200).json(styles);
});

app.get("/products/:id/related", async (req, res) => {
  const relatedProducts = await controllers.getRelatedProducts(req.params.id);
  res.status(200).json(relatedProducts);
});
