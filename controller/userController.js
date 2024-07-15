const userModel = require("../model/usermodel");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");

const home = async (req, res) => {
  return res.render("index");
};

const addUser = async (req, res) => {
  return res.render("signup");
};

const userData = async (req, res) => {
  const { username, email, password } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).render("signup", { errors: errors.array() });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await userModel.create({ username, email, password: hashedPassword });
    return res.redirect("login");
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).send("Server error");
  }
};

const loginform = async (req, res) => {
  return res.render("login");
};

const showChangePasswordForm = async (req, res) => {
  return res.render("changePassword");
};

const changePassword = async (req, res) => {
  const { password } = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).render("changePassword", { errors: errors.array() });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await userModel.findByIdAndUpdate(req.user.id, { password: hashedPassword });
    return res.redirect("/");
  } catch (error) {
    console.error("Error updating password:", error);
    return res.status(500).send("Server error");
  }
};


const logout = (req, res) => {
  req.logOut((err) => {
    if (err) {
      return err;
    } else {
      return res.redirect("/login");
    }
  });
};


module.exports = { home, loginform, addUser, userData, showChangePasswordForm, changePassword,logout };
