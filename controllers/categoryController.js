const categoryModel = require("../model/categoryModel");
const slugify = require("slugify");

const createCategoryController = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(401).send({ message: 'Name is required' });
        }
        const existingCategory = await categoryModel.findOne({ name });
        if (existingCategory) {
            return res.status(200).send({
                success: true,
                message: "Category Already Exists"
            })
        }
        const category = await new categoryModel({ name, slug: slugify(name) }).save();
        res.status(201).send({
            success: true,
            meassage: 'new category created',
            category
        })

    } catch (error) {

    }
}

const updateCategoryController = async (req, res) => {
    try {
        const { name } = req.body;
        const { id } = req.params;
        console.log(name);
        console.log(id);
        const category = await categoryModel.findByIdAndUpdate(id, { name, slug: slugify(name) }, { new: true });

        res.status(200).send({
            success: true,
            message: "Category Updated Succesfully",
            category
        })
    } catch (error) {
        console.log('Error @categorycontroller/UPD.js');
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: 'error in upd'
        })
    }
}

const categoryController = async (req, res) => {
    try {
        const category = await categoryModel.find({});

        res.status(200).send({
            success: true,
            message: "All categories list",
            category
        })
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            error,
            message: "Error while getting all categories"
        })
    }
}

const getSingleCategory = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id);
        const category = await categoryModel.findById(id);

        res.status(200).send({
            success: true,
            message: "Get Single Category Succesfully",
            category
        })
    } catch (error) {
        console.log(error);

        res.status(400).send({
            success: false,
            error,
            message: "Error while getting a category"
        })
    }
}

const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id);
        const category = await categoryModel.findByIdAndDelete(id);

        res.status(200).send({
            success: true,
            message: "Category Succesfully Deleted",
            category
        })
    } catch (error) {
        console.log(error);

        res.status(400).send({
            success: false,
            error,
            message: "Error while deleting a category"
        })
    }
}

module.exports = { createCategoryController, updateCategoryController, categoryController, getSingleCategory, deleteCategory };