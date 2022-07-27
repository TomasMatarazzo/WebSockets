const express = require('express');
const router = express.Router(); 

const {deleteProduct, updateProduct, showProduct, showAllProducts,testProducts} = require('../controller/productController.js')

 
// ================ RUTA PARA EL TEST =================
router.get('/test', testProducts)
//=====================================================

router.get("/", showAllProducts);
router.get("/:id", showProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;
