const jwt = require("jsonwebtoken");

const express = require("express");
const router = express.Router();
router.use(express.json());

const mongoose = require("mongoose")
const userSchema = require("../../connections/database/mongo/schemas/user-schema");
const UserModel = mongoose.model("User", userSchema, "users");

const cors = require("cors");

const bcrypt = require("bcrypt");

router.use(
  cors({
    origin: "*",
  })
);

router.post("/", async (req, res, next) => {
  try {
    const { userName, userPassword } = req.body;
    if (!userName || !userPassword) {
      return res.status(400).json({
        message:
          "Invalid request format. Both username and password are required!",
      });
    }

    const user = await UserModel.findOne({ userName });
    if (!user) {
      return res.status(401).json({ message: "User does not exist!" });
    }

    const match = await bcrypt.compare(userPassword, user.userPassword);
    if (!match) {
      return res.status(401).json({ message: "Invalid password!" });
    }

    const token = jwt.sign(
      { id: user._id, userName: user.userName, permissions: user.permissions },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1h" }
    );

    return res
      .status(200)
      .cookie('jwt', token, { httpOnly: true, secure: true, maxAge: 3600000 })
      .json({ token, message: "User authenticated successfully!" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
