const jwt = require("jsonwebtoken");
const db = require("../../connections/database/mongo/mongodb-connection");

const express = require("express");
const userRouter = express.Router();
userRouter.use(express.json());

const userSchema = require("../../connections/database/mongo/schemas/user-schema");

const cors = require("cors");

const bcrypt = require("bcrypt");

userRouter.use(
  cors({
    origin: "*",
  })
);

userRouter.post("/", async (req, res, next) => {
  try {
    const { userName, userPassword } = req.body;
    if (!userName || !userPassword) {
      return res.status(400).json({
        message:
          "Invalid request format. Both username and password are required!",
      });
    }

    const user = await userSchema.findOne({ userName });
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

module.exports = userRouter;
