const User = require("../model/User");

// handle logout
const handleLogout = async (req, res) => {
  // On client, also delete the access token
  const cookies = req.cookies;
  // chk if cookie exist, and if exist, is cookie.jwt exist (chaining)
  if (!cookies?.jwt) {
    // since we're going to delete the cookies
    // thus if there no cookies, it's fine
    return res.sendStatus(204); // no content to send back
  }

  // Is refresh token in DB?
  const refreshToken = cookies.jwt;

  // find user by refresh token
  const foundUser = await User.findOne({ refreshToken }).exec();

  if (!foundUser) {
    // clear cookies
    // Note: same options needed to be filled in
    res.clearCookie("jwt", { httpOnly: true });
    return res.sendStatus(204); // no content to send back
  }

  // Delete the refresh token (set it to empty string)
  foundUser.refreshToken = "";
  const result = await foundUser.save();
  console.log(result);

  // clear cookies
  res.clearCookie("jwt", { httpOnly: true });
  // In production, might add
  // secure: true (only serves on https)
  return res.sendStatus(204);
};

//
module.exports = { handleLogout };
