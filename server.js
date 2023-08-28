// dotenv
require("dotenv").config();

// mongoose
const mongoose = require("mongoose");
const connectDB = require("./config/dbConn");

// express
const express = require("express");
const app = express();
// others
const path = require("path");
// port
const PORT = process.env.PORT || 3500;

// Step 1. Connect to DB
connectDB();

// jwt verify
const verifyJWT = require("./middleware/verifyJWT");
const cookieParser = require("cookie-parser");

// require custom function for middleware
// since logEvents has 2 exports now (logger, logEvents)
// thus, need to use destructuring syntax
const { logger } = require("./middleware/logEvents");

// custom middleware - logger form logEvents.js
app.use(logger);

// built-in middleware to handle urlencoded data
// in other words, format data
// "content-type: application/x-www-form-urlencoded"
app.use(express.urlencoded({ extended: false }));
// built-in middleware for json
app.use(express.json());
// middleware for cookie
app.use(cookieParser());

// serve static files - where to put css, img, ... etc
app.use(express.static(path.join(__dirname, "/public")));

// router - root
app.use("/", require("./routes/root"));
// register
app.use("/register", require("./routes/register"));
// auth
app.use("/auth", require("./routes/auth"));
// refresh token
app.use("/refresh", require("./routes/refresh"));
// logout
app.use("/logout", require("./routes/logout"));

// using jwt to protect the routes below
// note that the script read from top to down
// thus, all routes above are not protected by verifyJWT
app.use(verifyJWT);
// router - employees
app.use("/employees", require("./routes/api/employees"));

// Cross Origin Resource Sharing
const cors = require("cors");
// cors options (put in config file to make .js cleaner)
const corsOptions = require("./config/corsOptions");
app.use(cors(corsOptions));

// catch all
// app.get("/*", (req, res) => {
//   res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
// });
// catch all - different syntax
// where routing accept regex (*)
app.all("*", (req, res) => {
  res.status(404);
  // someting more detailed
  if (req.accepts("html")) {
    // if request a html file
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    // if request a json
    res.json({ error: "404 Not Found" });
  } else {
    // if request a txt
    res.type("txt").send("404 Not Found");
  }
});

// middleware - catch err
const errHandler = require("./middleware/errHandler");
app.use(errHandler);

// If we dont connect, we dont want to listen
// first listen to mongoose "open" connection event once
// See more details in mongoose doc
mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
