const User = require("../model/User");

// JWT
const jwt = require("jsonwebtoken");
// env (to beginning of sever.js)
// require("dotenv").config();

// handle refresh token
const handleRefreshToken = async (req, res) => {
  // looking for cookie in req
  const cookies = req.cookies;
  // chk if cookie exist, and if exist, is cookie.jwt exist (chaining)
  if (!cookies?.jwt) {
    return res.sendStatus(401);
  }
  console.log(cookies.jwt);
  //
  const refreshToken = cookies.jwt;

  // find user by refresh token
  const foundUser = await User.findOne({ refreshToken }).exec();
  if (!foundUser) {
    return res.sendStatus(403); // forbidden
  }

  // verify
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    // if err or user is not the user in DB
    if (err || foundUser.username !== decoded.username) {
      return res.sendStatus(403);
    }

    // get user's role (value)
    const roles = Object.values(foundUser.roles);
    // if verified, create a new access token
    const accessToken = jwt.sign(
      {
        UserInfo: {
          username: decoded.username,
          roles: roles,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "30s" }
    );

    // send token to user
    return res.json({ accessToken });
  });
};

//
module.exports = { handleRefreshToken };
