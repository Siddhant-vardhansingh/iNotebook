const express = require("express");
const router = express.Router();
const User = require("../models/Users");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET_TOKEN = "Siddhant@1";
const fetchuser = require("../middleware/fetchuser")

// Create a user - /api/auth/signup
router.post(
  "/signup",
  [
    body("name", "Enter a Valid Name").isLength({ min: 3 }),
    body("email", "Enter a Valid email").isEmail(),
    body("password", "Password must be min 4 characters").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        res.status(400).send("User Already exists");
      }
      const Salt = await bcrypt.genSalt(10);
      const secPassword = await bcrypt.hash(req.body.password, Salt);
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPassword,
      });
      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET_TOKEN);
      res.json({ authToken });
    } catch (error) {
      console.error(error.message);
      res.status(500).json(req.body).send("Internal Server Error");
    }
  }
);

// Authenticate a User - /api/auth/login

router.post(
  "/login",
  [
    body("email", "Enter a Valid email").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        res.status(400).json({ error: "Enter Correct Email" });
      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        res.status(400).json({ error: "Enter correct Password" });
      }
      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET_TOKEN);
      res.json({ authToken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server error");
    }
  }
);

module.exports = router;

// Get user's details - POST Request - /api/auth/getuser - login required

router.post(
  "/getuser",
  fetchuser,
  async (req, res) => {
    try {
      userID = req.user.id;
      const user = await User.findById(userID).select("-password")
      res.send(user)
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server error");
    }
  })