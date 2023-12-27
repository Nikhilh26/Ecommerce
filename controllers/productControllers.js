const { default: slugify } = require("slugify");
const productModel = require("../model/productModel");
const fs = require("fs");
const categoryModel = require("../model/categoryModel");

const createProductController = async (req, res) => {
    try {
        console.log(req.fields);

        const { name, description, price, category, quantity, shipping } = req.fields;
        const { photo } = req.files;

        if (!name || !description || !price || !category || !quantity || !shipping || !photo) {
            return res.status(200).send({ success: false, message: "Incomplete Details" });
        }

        console.log(name);
        console.log(description);
        console.log(price);
        console.log(category);
        console.log(quantity);
        console.log(shipping);

        if (photo.size > 10000000) {
            return res.status(200).send({ success: false, message: "Image Size shold be less than 1mb" });
        }
        const getId = await categoryModel.findOne({ name: category });
        console.log(getId);

        const product = new productModel({ ...req.fields, slug: slugify(name), category: getId._id });

        if (photo) {
            product.photo.data = fs.readFileSync(photo.path);
            product.photo.contentType = photo.type
        }

        await product.save();

        res.status(201).send({
            success: true,
            message: 'Product Created Succesfully',
            product
        })

    } catch (error) {
        console.log(error);
        res.status(200).send({
            success: false,
            error,
            message: 'Error in creating product'
        })
    }
}

const getProductController = async (req, res) => {
    try {
        const products = await productModel.find({}).select("-photo").limit(12).sort({ createdAt: -1 }).populate('category');

        res.status(200).send({
            success: true,
            message: "All Products",
            products,
            count: products.length
        })

    } catch (error) {
        console.log(error);

        res.status(500).send({
            success: false,
            message: 'Error in getting products',
            err: error.message
        })
    }
}

const getSingleProduct = async (req, res) => {
    try {
        const product = await productModel.findOne({ slug: req.params.slug }).select("-photo");

        res.status(200).send({
            success: true,
            message: 'Single Product Fetches',
            product
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: true,
            message: 'Error while gettting single product',
            error: error.message
        })
    }
}

const productPhotoController = async (req, res) => {
    try {
        const product = await productModel.findById(req.params.id).select("photo");

        if (product.photo.data) {
            res.set("Content-type", product.photo.contentType);

            return res.status(200).send(product.photo.data);
        }
    } catch (error) {
        console.log(error);

        res.status(500).send({
            success: false,
            message: "Error while getting photo"
        })
    }
}

const deleteProductController = async (req, res) => {
    try {
        await productModel.findByIdAndDelete(req.params.id).select("-photo");

        res.status(200).send({
            success: true,
            message: "Product deleted succesfully"
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while deleting product",
            error
        })
    }
}

const updateProductController = async (req, res) => {
    try {
        //console.log(">>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<");
        console.log(req.fields);

        const { name, description, price, category, quantity, shipping } = req.fields;
        const { photo } = req.files;

        if (!name || !description || !price || !category || !quantity || !shipping || !photo) {
            return res.status(500).send({ success: false, message: "Incomplete Setails" });
        }

        if (photo.size > 10000000) {
            return res.status(500).send({ success: false, message: "Image Size shold be less than 1mb" });
        }

        const product = await productModel.findByIdAndUpdate(req.params.id, { ...req.fields, slug: slugify(name) }, { new: true });

        if (photo) {
            product.photo.data = fs.readFileSync(photo.path);
            product.photo.contentType = photo.type
        }

        await product.save();

        res.status(201).send({
            success: true,
            message: 'Product Updated Succesfully',
            product
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: 'Error in upting product'
        })
    }
}

module.exports =
{
    createProductController,
    getProductController, getSingleProduct, productPhotoController, deleteProductController, updateProductController
};