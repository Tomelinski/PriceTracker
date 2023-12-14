const express = require('express');
const passport = require("passport");
const { isAuthenticated } = require("../middlewares/auth");
const authController = require("../controllers/AuthController");
const config = require("../database/config/config");

const router = express.Router();

router.get("/user", isAuthenticated, (req, res) => {
  res.json(req.user);
});

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "select_account",
  }),
  (req, res) => {
    res.status(200).send("Authenticated with Google");
  }
);

router.get(
  "/google/redirect",
  passport.authenticate("google", {
    failureRedirect: `${config.development.url}:${config.development.client}/login`,
    successRedirect: `${config.development.url}:${config.development.client}/auth/login/success`,
  }),
  (req, res) => {
    res.status(200).send("Authenticated with Google");
  }
);


// router.post('/login', authController.login);
router.post('/login', 
  passport.authenticate('local', {
    failureRedirect: `${config.development.url}:${config.development.client}/login`,
    successRedirect: `${config.development.url}:${config.development.client}/`,
  }),
  (req, res) => {
    res.status(200).send("User authenticated");
  }
);

router.post('/register', authController.register);

router.get('/logout', authController.logout);

module.exports = router;
