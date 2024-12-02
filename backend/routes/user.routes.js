const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const { body } = require("express-validator");

router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("fullname.firstname")
      .isLength({ min: 3 })
      .withMessage("First name should be atleast of length 3"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password should be of length 6"),
  ],
  userController.registerUser
);

module.exports = router;
