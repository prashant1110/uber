const blackListModel = require("../models/blackListToken.model");
const captainModel = require("../models/captain.model");
const captainService = require("../services/captain.service");
const { validationResult } = require("express-validator");

module.exports.createCaptain = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { fullname, email, password, vehicle } = req.body;

  const isCaptainExists = await captainModel.findOne({ email });

  if (isCaptainExists) {
    return res
      .status(400)
      .json({ message: "Captain already exists with this email" });
  }

  const hashedPassword = await captainModel.hashPassword(password);

  const captain = await captainService.createCaptain({
    firstname: fullname.firstname,
    lastname: fullname.secondname,
    email,
    password: hashedPassword,
    color: vehicle.color,
    capacity: vehicle.capacity,
    plate: vehicle.plate,
    vehicleType: vehicle.vehicleType,
  });

  const token = await captain.generateAuthToken();

  res.status(201).json({ token, captain });
};

module.exports.loginCaptain = async (req, res, next) => {
  const { email, password } = req.body;

  const captain = await captainModel.findOne({ email }).select("+password");

  if (!captain) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const isMatch = await captain.comparePassword(password);

  if (!isMatch) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const token = await captain.generateAuthToken();

  res.cookie("token", token);

  res.status(201).json({ token, captain });
};

module.exports.getAuthCaptain = async (req, res, next) => {
  res.status(201).json(req.captain);
};

module.exports.logoutCaptain = async (req, res, next) => {
  const token = req.cookie.token || req.headers.authorization.split(" ")[1];

  await blackListModel.create({ token });

  res.status(201).json({ message: "Logged Out" });
};
