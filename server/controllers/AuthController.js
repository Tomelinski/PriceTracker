const passport = require("passport");
const { User } = require("../models");
const { bcrypt, saltRounds } = require("../database/config/bcryptConfig.js");

const login = async (req, res, next) => {
  // passport.authenticate("local", (err, user, info) => {
  //   if (err) {
  //     console.error(err);
  //     return next(err);
  //   }
  //   if (!user) {
  //     return res.status(404).json({ message: "User not found." });
  //   }
  //   req.login(user, (err) => {
  //     if (err) {
  //       console.error(err);
  //       return next(err);
  //     }
  //     return res.status(200).send('User Logged In');
  //   });
  // })(req, res, next);
};

const register = async (req, res, next) => {
  try {
    const existingUser = await User.findOne({
      where: { emailAddress: req.body.email },
    });

    if (existingUser) {
      console.error("Error: User Already Exists");
      return res
        .status(409)
        .json({ message: "A user already exists with this email." });
    }

    const newUser = await User.create({
      name: `${req.body.firstName} ${req.body.lastName}`,
      emailAddress: req.body.email,
      password: req.body.password,
    });

    res
      .status(200)
      .json({ message: "User registered successfully", user: newUser });
  } catch (err) {
    console.error(
      "An issue occurred while attempting to insert a new user: ",
      err
    );
    return res
      .status(400)
      .send("Could not create user. Please try again later.");
  }
};


const logout = (req, res, next) => {
  try {
    req.session = null;
    req.logout();
    res.status(200).send("User Logged Out");
  } catch (err) {
    console.error("Error during logout", err);
    next(err);
  }
};

module.exports = {
  login,
  register,
  logout,
};
