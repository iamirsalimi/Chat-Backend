const jwt = require("jsonwebtoken");
const UserModel = require("./../models/User");

exports.auth = async (req, res, next) => {
  try {
    const { username, phone } = req.body;

    // TODO Data Validation

    let user = await UserModel.findOne({ username, phone });
    let statusCode = 200;

    if (!user) {
      user = await UserModel.create({ username, phone });
      statusCode = 201;
    }

    const token = jwt.sign({ _id: user._id }, process.env.ACCESS_TOKEN_KEY, {
      expiresIn: "2d",
    });

    // res.cookie("token", token, {
    //   httpOnly: true,
    //   signed: true,
    //   maxage: 1000 * 60 * 15,
    // });

    return res.status(statusCode).json({
      message: "User authenticated successfully",
      token,
    });
  } catch (err) {
    next(err);
  }
};

exports.me = async (req, res, next) => {
  try {
    const authorization = req.headers["authorization"].split(" ")[1];

    if (authorization) {
      const payload = jwt.decode(authorization);
      const user = await UserModel.findOne({ _id: payload._id });
      if (user) {
        return res.json(user);
      } else {
        return res.status(404).json(user);
      }
    } else {
      return res.status(404).json(null);
    }
  } catch (err) {
    next(err);
  }
};
