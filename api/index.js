require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const User = require("./models/User");
const bcrypt = require("bcryptjs");

const app = express();

const bcryptSalt = bcrypt.genSaltSync(10);

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);
app.use(morgan("dev"));
app.use(express.json());

mongoose.connect(process.env.MONGODB_URL);

app.get("/test", (req, res) => {
  res.json("test ok");
});

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userDoc = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
    });
    res.json(userDoc);
  } catch (e) {
    res.status(422).json(e);
  }
});

app.listen(4000);
