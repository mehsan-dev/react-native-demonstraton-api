const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true, min: 8, max: 25 },
  resetToken: { type: String, default: null, required: false },
  resetTokenExpiration: { type: Number, required: false, default: null },
});

UserSchema.pre("save", async function (next) {
  try {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } catch (error) {
    throw new Error(error);
  }
});

UserSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw new Error(error);
  }
};

UserSchema.methods.generateAuthToken = function () {
  try {
    const token = jwt.sign(
      { _id: this._id.toString() },
      process.env.JWT_PRIVATE_KEY
    );
    return token;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = mongoose.model("User", UserSchema);
