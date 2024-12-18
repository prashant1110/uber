const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const cookieparser = require("cookie-parser");
const connectToDB = require("./db/db.js");
const userRoutes = require("./routes/user.routes.js");
const captainRoutes=require("./routes/captain.routes.js")
const app = express();

app.use(cookieparser());
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
connectToDB();

app.use("/users", userRoutes);
app.use("/captain",captainRoutes)

module.exports = app;
