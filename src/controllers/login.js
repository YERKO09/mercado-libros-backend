require('dotenv').config();
const { UsersCollection } = require("../database/models/usersModel");
const jwt = require("jsonwebtoken");

const secretKey = process.env.JWT_SECRET;

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    await UsersCollection.verificarCredenciales(email, password);
    console.log("SECRET🔑  ➡️   ", secretKey);

    const token = jwt.sign({ email }, secretKey);
    console.log("TOKEN 🔐  ➡️   ",   token);

    res.send({ token });
  } catch (error) {
    console.log(error);
    res.status(error.code || 500).send(error);
  }
};

module.exports = { loginController };
