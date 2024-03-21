require("dotenv").config();
const cors = require("cors");
const express = require("express");
const http = require("http");
const passport = require("passport");
const cookieSession = require("cookie-session");

const routes = require("./routes");

require("./helpers/auth/googleStrategy");
require("./helpers/auth/localStrategy");

const app = express();

const port = process.env.APP_PORT || 8000;
const clientPort = process.env.CLIENT_PORT || 3000;
const clientURL = process.env.URL || "http://localhost";

app.use(cors({ origin: `${clientURL}:${clientPort}`, credentials: true }));

app.use(express.json());
app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_SECRET],
    name: "session",
  }),
);

app.use(passport.initialize());
app.use(passport.session());

app.use(routes);

app.use((err, req, res) => {
  console.error(err.stack);
  res
    .status(500)
    .json({ message: "Something went wrong, please try again later." });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
