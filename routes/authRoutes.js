const express = require("express");
const { registerController, loginController, routeTesting, forgotpwHandler } = require("./../controllers/authLogin");
const { validateToken, adminLoginHandler } = require("./../middleware/authMiddleware");

const router = express.Router();

router.post('/register', registerController);

router.post('/login', loginController);

router.post('/forgot-password', forgotpwHandler);

router.get('/user-auth', validateToken, (req, res) => {
    res.status(200).send({ 'ok': true });
});

router.get("/admin-auth", validateToken, adminLoginHandler, (req, res) => {
    res.status(200).send({ 'ok': true });
});

module.exports = router;