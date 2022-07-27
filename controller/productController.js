const models = require("../models/index.js");
const {faker} = require("@faker-js/faker");

const showProduct = (req,res) =>{
    const id = parseInt(req.params.id);
    if (id >= 0 && id < models.products.length) {
      res.json(models.products[id]);
    } else res.status(500).json({ error: "Hubo un error" });
}

const showAllProducts = (req, res) => {
  //res.json(models.products);
  res.render("products", {products: models.products})
}
const updateProduct = (req,res) =>{
    const id = parseInt(req.params.id);
    const { price, title, thumbnail } = req.body;
  
    if (id && price && title && thumbnail) {
      models.products.forEach((product) => {
        if (product.id == id) {
          product.price = price;
          product.title = title;
          product.thumbnail = thumbnail;
        }
      });
      res.send(models.products);
    } else res.status(500).json({ error: "Hubo un error" });
}



const deleteProduct =  (req, res) => {
    const id = req.params.id;
    if (id >= 0 && id < models.products.length) {
      models.products = models.products.map((product, id) => {
        parseInt(product.id) == id;
      });
      console.log(models.products);
      res.send(models.products);
    } else res.status(500).json({ error: "Hubo un error" });
}

const testProducts =  (req,res) =>{
  let products = []
  for (let i = 0 ; i < 5 ; i++){
    let name = faker.commerce.product()
    let price = faker.commerce.price()
    let description = faker.commerce.productDescription()
    products[i] = {name , price , description}
  }
  res.render('test',{products})
}

module.exports = {showProduct,updateProduct,deleteProduct , testProducts, showAllProducts}

