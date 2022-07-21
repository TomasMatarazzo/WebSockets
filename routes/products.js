const models = require("../models/index.js");
const { Router } = require("express"); 
const router = new Router();
const {faker} = require("@faker-js/faker");

 
router.get("/", (req, res) => {
  //res.json(models.products);
  res.render("products", {products: models.products})
});

// ================ RUTA PARA EL TEST =================

router.get('/test', (req,res) =>{
  let products = []
  for (let i = 0 ; i < 5 ; i++){
    let name = faker.commerce.product()
    let price = faker.commerce.price()
    let description = faker.commerce.productDescription()
    products[i] = {name , price , description}
  }
  res.render('test',{products})
})

//=====================================================
router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  if (id >= 0 && id < models.products.length) {
    res.json(models.products[id]);
  } else res.status(500).json({ error: "Hubo un error" });
});

router.put("/:id", (req, res) => {
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
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  if (id >= 0 && id < models.products.length) {
    models.products = models.products.map((product, id) => {
      parseInt(product.id) == id;
    });
    console.log(models.products);
    res.send(models.products);
  } else res.status(500).json({ error: "Hubo un error" });
});

module.exports = router;
