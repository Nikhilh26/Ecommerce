const express = require("express");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const userModel = require("../model/userModel");
dotenv.config();

const ACCESS_TOKEN = process.env.JWT_TOKEN;

const validateToken = async (req, res, next) => {

    console.log(req.body);
    //return;
    let token = req.headers.authorization.split(" ")[1];
    //next();
    //console.log(ACCESS_TOKEN);
    //console.log(token);
    jwt.verify(token, ACCESS_TOKEN, (err, decoded) => {

        if (err) {
            res.status(401);
            console.log("Error in jwt Validation @middleware/authMiddleware");
            //console.log(err);
            return;
            //next(new Error("User is not authorised"));
        }

        //console.log(decoded);
        req.user = decoded;
        //     //console.log(req.user);
        next();
    })
}

adminLoginHandler = async (req, res, next) => {
    try {
        const user = await userModel.findById(req.user._id);

        if (user.role !== 1) {

            return res.status(401).send({
                success: false,
                message: "UnAuthorized Access?"
            })

        } else {
            console.log("User is admin")
            next();
        }

    } catch (error) {
        console.log("Error @middleware/authMiddleware/adminLoginHandler");
        console.log(error);
    }
}
module.exports = { validateToken, adminLoginHandler };