const User = require("../models/User.model");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");

exports.findOne = async (query) => {
  return await User.findOne(query);
};

exports.create = async (data) => {
  let user = new User(data);
  return await user.save();
};

exports.update = async (query, user) => {
  return await User.findByIdAndUpdate(query, user, { new: true });
};

exports.delete = async (query) => {
  return await User.findByIdAndDelete(query);
};

exports.forgotPassword = async (data) => {
  const user = await User.findOne({ email: data.email });
  if (!user) {
    throw new Error("User not found");
  }

  const token = crypto.randomBytes(2).toString("hex");

  await User.updateOne(
    { _id: user._id },
    {
      $set: {
        resetToken: token,
        resetTokenExpiration: Date.now() + 3600000, // 1 hour
      },
    }
  );

  const transporter = nodemailer.createTransport({
    host: process.env.MAIL_TRAP_HOST,
    port: process.env.MAIL_TRAP_PORT,
    auth: {
      user: process.env.MAIL_TRAP_USER,
      pass: process.env.MAIL_TRAP_PASSWORD,
    },
  });

  const mailOptions = {
    from: "no-reply@testApp.com",
    to: user.email,
    subject: "Password reset request",
    text: `Hi ${user.email},\n\nYou recently requested a password reset. Here is your reset code: ${token}\n\nIf you did not request a password reset, you can ignore this email.`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      throw new Error("Error sending email");
    } else {
      console.log(`Email sent: ${info.response}`);
      return "Email sent";
    }
  });
};

exports.resetPassword = async (data) => {
  const { code, newPassword } = data;
  const user = await User.findOne({
    resetToken: code,
    resetTokenExpiration: { $gt: Date.now() },
  });

  if (!user) {
    throw new Error("Invalid or expired code");
  }

  const hash = bcrypt.hashSync(newPassword, 10);
  await User.updateOne(
    { _id: user._id },
    {
      $set: {
        password: hash,
        resetToken: null,
        resetTokenExpiration: null,
      },
    }
  );

  return "Password reset successful";
};
