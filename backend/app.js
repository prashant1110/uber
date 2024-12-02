const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const cookieparser=require("cookie-parser")
const connectToDB = require("./db/db.js");
const userRoutes=require("./routes/user.routes.js")
const app = express();

app.use(cookieparser());
app.use(express.json())
app.use(cors());
connectToDB();

app.use('/users',userRoutes)

module.exports = app;
