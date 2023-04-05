const { validateUser } = require("../helpers/validations");
const UserService = require("../services/user.service");
const _ = require("lodash");

exports.createUser = async (req, res) => {
  try {
    const { error } = validateUser.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const user = await UserService.findOne({ email: req.body.email });

    if (user) return res.status(403).json({ message: "Email Already exists" });

    const addedUser = await UserService.create(
      _.pick(req.body, ["email", "password"])
    );

    res.status(201).json({ message: "User Added Successfully", addedUser });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.loginUser = async (req, res) => {
  try {
    if (!req.body.email || !req.body.password)
      return res.status(400).json({ message: "Missing email or password" });

    let user = await UserService.findOne({ email: req.body.email });
    if (!user) return res.status(400).json({ message: "email not found!" });

    if (!(await user.comparePassword(req.body.password)))
      return res.status(401).json({ message: "Invalid email or password" });

    let token = user.generateAuthToken();

    res
      .status(200)
      .json({ message: "Login Successful!", user: user, token: token });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const result = await UserService.forgotPassword(req.body);
    return res.json(result);
  } catch (error) {
    res.status(500).json({ message: error?.message || "something went wrong" });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const result = await UserService.resetPassword(req.body);
    return res.json(result);
  } catch (error) {
    res.status(500).json({ message: error?.message || "something went wrong" });
  }
};
