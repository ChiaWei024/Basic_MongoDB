const User = require("../model/User");

// bcrypt - has and salt the password
const bcrypt = require("bcrypt");

// handle newUser
const handleNewUser = async (req, res) => {
  const { user, pwd } = req.body;
  // chk if user and pwd exist
  if (!user || !pwd) {
    return res
      .status(400)
      .json({ message: "Username and password are required." });
  }

  // chk for duplicate user using mongoose model User
  const duplicate = await User.findOne({ username: user }).exec();
  if (duplicate) {
    return res.status(409).json({ message: `Username ${user} already exist.` }); // conflict
  }

  //
  try {
    // encrypt the pwd
    const salt = 10;
    const hashedPwd = await bcrypt.hash(pwd, salt);
    // Create and store new user usong mongoose model User
    const result = await User.create({
      username: user,
      password: hashedPwd,
    });

    console.log(result);

    // // Another way to create and store user (more tedious)
    // const newUser = new User();
    // newUser.username = user;
    // newUser.password = hashedPwd;
    // const resultt = await newUser.save();

    return res.status(201).json({ success: `New user ${user} created.` });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// export
module.exports = { handleNewUser };
