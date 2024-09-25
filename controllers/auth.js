const User = require("../models/User.js");
const { StatusCodes } = require("http-status-codes");

// create user in db
const registerUser = async (req, res) => {
  try {
    const user = await User.create({ ...req.body });

    const token = user.createJWT();
    // Send response
    res.status(StatusCodes.CREATED).json({
      user: {
        name: user.name,
        email: user.email,
        id: user._id,
      },
      token,
    });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({
      message: error.message,
    });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: "Please provide email and password",
    });
  }
  try {
    const user = await User.findOne({ email }).select("+password").exec();
    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: "Invalid credentials",
      });
    }
    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        message: "Invalid credentials",
      });
    }
    const token = user.createJWT();
    res.status(StatusCodes.OK).json({
      user: {
        name: user.name,
        email: user.email,
        id: user._id,
      },
      token,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: error.message,
    });
  }
};

module.exports = { registerUser, loginUser };
