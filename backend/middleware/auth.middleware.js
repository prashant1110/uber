const jwt = require("jsonwebtoken");
const useModel = require("../models/user.model");
const blackListModel = require("../models/blackListToken.model");

module.exports.authUser = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization.split(" ")[1];
  
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const isBlackListToken = await blackListModel.findOne({ token: token });

  if (isBlackListToken) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await useModel.findById(decoded._id);

    req.user = user;

    return next();
  } catch (error) {
    return res.status(401).json({error });
  }
};