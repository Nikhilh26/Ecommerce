const bcrypt = require('bcrypt');

const hashPassword = async (password) => {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        return hashedPassword;
    } catch (error) {
        console.log("Error in helper/authHelper.js");
        return null;
    }
}

const comparePasswords = async (password, hashedPassword) => await bcrypt.compare(password, hashedPassword);


module.exports = { hashPassword, comparePasswords };
