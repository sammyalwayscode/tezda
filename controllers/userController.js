// userController.js
const userModel = require("../models/userModel");

module.exports = {
  async registerUser(req, res) {
    const { username, email, password } = req.body;
    try {
      await userModel.createUser(username, email, password);
      res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      res.status(500).json({ error: "Unable to register user" });
    }
  },

  async loginUser(req, res) {
    const { email, password } = req.body;
    try {
      const user = await userModel.getUserByEmail(email);
      if (user && user.password === password) {
        res.status(200).json({ message: "Login successful" });
      } else {
        res.status(401).json({ error: "Invalid credentials" });
      }
    } catch (error) {
      res.status(500).json({ error: "Unable to log in" });
    }
  },
};
