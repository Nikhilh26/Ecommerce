const UserModel = require("./../model/userModel");
const { comparePasswords, hashPassword } = require("./../helper/authHelper");
const JWT = require("jsonwebtoken");
const userModel = require("./../model/userModel");

const registerController = async (req, res) => {
    try {
        const { name, email, password, address, phone, question } = req.body;

        if (!name || !email || !password || !address || !phone) {
            console.log("Error at registerController")
            return res.status(401).
                send({
                    "success": "false",
                    "Error": "Incomplete Credentials"
                });
        }

        const User = await UserModel.findOne({ email });

        if (User) {
            return res.status(200).send({
                success: "false",
                message: "Already registered"
            })
        }

        const h_Password = await hashPassword(password);
        console.log("Hey");
        console.log(h_Password);

        if (h_Password === null) {
            throw new Error("Error in authHelper.js -> password null");
        }
        const user = await new UserModel({
            email,
            name,
            password: h_Password,
            address,
            phone,
            question
        }).save();

        res.status(200).send({
            "success": "true",
            user
        })

    } catch (error) {
        console.log("Error at controllers/authLogin.js")
        console.log(error);
        res.status(401).send("Error in Server");
    }


}

const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(404).send({ "Response": "Incomplete Credentials!!" });
        }

        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(404).send({ "message": "Please Create Account First" });
        }

        const check = await comparePasswords(password, user.password);
        console.log("Checking passwords after comparing");
        console.log(check);

        if (!check) {
            res.status(200).send(
                {
                    "success": "false",
                    "message": "Invalid Password"
                }
            )
            return;
        }

        const token = await JWT.sign({ _id: user._id }, process.env.JWT_TOKEN, { expiresIn: '7d' });
        res.status(200).send({
            "success": "true",
            "message": "Login Succesful",
            user: {
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                id: user._id,
                role: user.role
            },
            token,
        });


    } catch (error) {
        res.status(500).send({
            message: "error in login"
        })
    }
}

const routeTesting = (req, res) => {
    res.status(200).send("Recieved");
}

const forgotpwHandler = async (req, res) => {
    console.log(req.body);

    try {
        const { email, question, newPassword } = req.body;

        if (!email || !question || !newPassword) {
            console.log("Response " + "Incomplete Credentials!! @controllers/authlogin");
            return res.status(404).send({ "Response": "Incomplete Credentials!!" });

        }

        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(404).send({ "message": "Please Create Account First" });
        }
        const hashedPassword = await hashPassword(newPassword);

        if (user.question === question) {
            await userModel.findByIdAndUpdate(user._id, { password: hashedPassword });

            return res.status(200).send({
                success: true,
                message: "password changed"
            })

        } else {

            return res.status(404).send({
                success: false,
                "message": "Incorrect answer"
            });

        }

    } catch (err) {
        console.log('Error @controllers/authLogin/forgotpwHandler.js');
        console.log(err);
    }
}

module.exports = { registerController, loginController, routeTesting, forgotpwHandler };