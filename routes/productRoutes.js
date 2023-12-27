const express = require("express");
const { validateToken, adminLoginHandler } = require("../middleware/authMiddleware");
const { createProductController, getProductController, getSingleProduct, productPhotoController, deleteProductController, updateProductController } = require("../controllers/productControllers");
const formidable = require("express-formidable");

const router = express.Router();

router.post('/create-product', validateToken, adminLoginHandler, formidable(), createProductController);

router.get('/get-products', getProductController);

router.get('/get-product/:slug', getSingleProduct);

router.get('/get-photo/:id', productPhotoController);

router.delete('/delete-product/:id', deleteProductController);

router.put('/update-product/:id', formidable(), updateProductController);

module.exports = router;