const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const captianSchema = new mongoose.Schema({
  fullname: {
    firstname: {
      type: String,
      required: true,
      minlength: [3, "Firstname must be at least 3 characters long"],
    },
    lastname: {
      type: String,
      minlength: [3, "Lastname must be at least 3 characters long"],
    },
  },
  email: {
    type: String,
    requied: true,
    unique: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  socketId: {
    type: String,
  },

  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "inactive",
  },

  vehicle: {
    color: {
      type: String,
      required: true,
      minlength: [3, "Color must be at least 3 characters long"],
    },
    plate: {
      type: String,
      required: true,
      minlength: [3, "Plate must be at least 3 characters long"],
    },
    capacity: {
      type: Number,
      required: true,
      min: [1, "Capacity must be at least 1"],
    },
    vehicleType: {
      type: String,
      required: true,
      enum: ["car", "motorcycle", "auto"],
    },
    location: {
      lat: {
        type: String,
      },
      long: {
        type: String,
      },
    },
  },
});

captianSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
  return token;
};

captianSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

captianSchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};

const captainModel = mongoose.model("captain", captianSchema);

module.exports = captainModel;


// {
//   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzRlOTUxNDY3YzMwYjY1OGE2YzU1NjAiLCJpYXQiOjE3MzMyMDMyMjAsImV4cCI6MTczMzI4OTYyMH0._Hglky7FzSvF55w3PBtjeKtwOyfbD0KdJJV8Q_Te67A",
//   "captain": {
//       "fullname": {
//           "firstname": "Test captain"
//       },
//       "email": "captain1@gmail.com",
//       "password": "$2b$10$2PiY71pVrJVb3h/cDRoay.lgtkMj2zHmxg2l66KnRAfjkU.AAu7qO",
//       "status": "inactive",
//       "vehicle": {
//           "color": "red",
//           "plate": "GJ 16 MJ 1575",
//           "capacity": 1,
//           "vehicleType": "motorcycle"
//       },
//       "_id": "674e951467c30b658a6c5560",
//       "__v": 0
//   }
// }