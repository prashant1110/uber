const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const app = express();
const connectToDB = require("./db/db.js");
const userRoutes=require("./routes/user.routes.js")

app.use(express.json())
app.use(cors());
connectToDB();

app.use('/users',userRoutes)

module.exports = app;
