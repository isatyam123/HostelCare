const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose"); // Import mongoose
module.exports.login = async (req, res, next) => {
  try {
    const { username, password, role, secertkey } = req.body;
    const user = await User.findOne({ username });
    if (!user)
      return res.json({ msg: "Incorrect Username or Password", status: false });
    const ValidPassword = await bcrypt.compare(password, user.password);
    if (!ValidPassword)
      return res.json({ msg: "Incorrect Username or Password", status: false });
    if (role !== "admin" && user.isadmin)
      return res.json({ msg: "You are not register", status: false });
    if (role === "admin" && !user.isadmin)
      return res.json({ msg: "You are not an admin", status: false });
    if (role === "admin" && secertkey !== process.env.ADMIN_KEY)
      return res.json({ msg: "Invalid Secert Key", status: false });
    delete user.password;
    return res.json({ status: true, user });
  } catch (error) {
    next(error);
  }
};
module.exports.register = async (req, res, next) => {
  try {
    const { username, email, password, gender, role, secertkey } = req.body;
    const usernameCheck = await User.findOne({ username });
    if (usernameCheck)
      return res.json({ msg: "Username already used", status: false });
    const emailCheck = await User.findOne({ email });
    if (emailCheck)
      return res.json({ msg: "Email already used", status: false });
    // console.log(process.env.ADMIN_KEY);
    // console.log(secertkey);
    const hashedPassword = await bcrypt.hash(password, 10);
    if (role === "admin" && secertkey !== process.env.ADMIN_KEY)
      return res.json({ msg: "Invalid Secert Key", status: false });

    const maleProfilePhoto = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const femaleProfilePhoto = `https://avatar.iran.liara.run/public/girl?username=${username}`;
    const user = await User.create({
      email,
      username,
      password: hashedPassword,
      ProfileImage: gender === "male" ? maleProfilePhoto : femaleProfilePhoto,
      gender,
      isadmin: role === "admin" ? true : false,
    });
    delete user.password;
    return res.json({ status: true, user });
  } catch (error) {
    next(error);
  }
};

module.exports.getAllUsers = async (req, res, next) => {
  try {
    const userId = req.params.id.trim(); // Trim the ID to remove any extraneous whitespace or newline characters

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Invalid user ID format" });
    }

    const users = await User.find({
      _id: { $ne: userId },
      isadmin: false,
    }).select(["email", "username", "ProfileImage", "_id"]);
    return res.json(users);
  } catch (error) {
    next(error);
  }
};

module.exports.getAlladmin = async (req, res, next) => {
  try {
    const userId = req.params.id.trim(); // Trim the ID to remove any extraneous whitespace or newline characters

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Invalid user ID format" });
    }

    const users = await User.find({ isadmin: true }).select([
      "email",
      "username",
      "ProfileImage",
      "_id",
    ]);
    return res.json(users);
  } catch (error) {
    next(error);
  }
};

module.exports.setAvatar = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const avatarImage = req.body.image;
    const userData = await User.findByIdAndUpdate(
      userId,
      {
        isAvatarImageSet: true,
        avatarImage,
      },
      { new: true }
    );
    return res.json({
      isSet: userData.isAvatarImageSet,
      image: userData.avatarImage,
    });
  } catch (error) {
    next(error);
  }
};

// userController.js

module.exports.logOut = (req, res, next) => {
  try {
    const userId = req.params.id;
    
    if (!userId) {
      return res.status(400).json({ msg: "User id is required" });
    }

    // Perform logout operations (e.g., clear sessions, tokens, etc.)
    // Example: Clearing user session or token

    // Send a success response
    res.status(200).json({ msg: "Logged out successfully" });
  } catch (error) {
    next(error); // Pass any caught errors to Express error handling middleware
  }
};

