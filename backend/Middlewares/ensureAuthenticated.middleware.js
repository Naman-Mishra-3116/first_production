import jsonwebtoken from "jsonwebtoken";
import { config } from "dotenv";
config();

export const enusreAuthenticatedMiddleware = function (req, res, next) {
  const auth = req.headers["authorization"];

  if (!auth) {
    return res
      .status(403)
      .json({ message: "You are not logged in", success: false });
  }

  try {
    const decoded = jsonwebtoken.verify(auth, process.env.JWT_SECRET);
    req.user = JSON.stringify(decoded);
    next();
  } catch (error) {
    console.log(error);
    return res.status(403).json({
      message: "Incorrect token",
      success: false,
      error: error.message,
    });
  }
};
