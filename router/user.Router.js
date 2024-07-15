// const { Router } = require("express");
// const router = Router();
// const passport = require("passport");
// const { body } = require("express-validator");
// const {home, loginform, addUser, userData} = require("../controller/userController"); 
// const isAuth = require("../middleware/isAuth");

// router.get("/", isAuth, home);
// router.get("/signup", addUser);
// router.get("/user", addUser);

// router.post(
//   "/user",
//   [
//     body("username").notEmpty().withMessage("Username is required"),
//     body("email").isEmail().withMessage("Please provide a valid email"),
//     body("password")
//       .isLength({ min: 6 })
//       .withMessage("Password must be at least 6 characters long"),
//   ],
//   userData
// );

// router.get("/login", loginform);
// router.post(
//   "/login",
//   passport.authenticate("local", {
//     successRedirect: "/",
//     failureRedirect: "/login",
//   })
// );

// module.exports = router;


const { Router } = require("express");
const router = Router();
const passport = require("passport");
const { body } = require("express-validator");
const { home, loginform, addUser, userData, showChangePasswordForm, changePassword, logout } = require("../controller/userController");
const isAuth = require("../middleware/isAuth");

router.get("/", isAuth, home);
router.get("/signup", addUser);
router.get("/user", addUser);

router.post(
  "/user",
  [
    body("username").notEmpty().withMessage("Username is required"),
    body("email").isEmail().withMessage("Please provide a valid email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  userData
);

router.get("/login", loginform);
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
  })
);

router.get("/changePassword", isAuth, showChangePasswordForm);
router.post(
  "/changePassword",
  [
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long")
  ],
  isAuth,
  changePassword
);

router.get("/logout", logout);

module.exports = router;
