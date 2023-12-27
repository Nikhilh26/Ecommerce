const express = require("express");
const { validateToken, adminLoginHandler } = require("../middleware/authMiddleware.js");
const { createCategoryController, updateCategoryController, categoryController, getSingleCategory, deleteCategory } = require("../controllers/categoryController.js");

const router = express.Router()

router.post('/create-category', validateToken, adminLoginHandler, createCategoryController);

router.put('/update-category/:id', validateToken, adminLoginHandler, updateCategoryController);

router.get('/get-category', categoryController);

router.get('/get-single-category/:id', getSingleCategory);

router.delete('/delete-category/:id', deleteCategory);

module.exports = router;