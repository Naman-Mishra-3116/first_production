import { config } from "dotenv";
import jsonwebtoken from "jsonwebtoken";
config();

export const userInformationController = function (req, res) {
  try {
    const token = req.headers["authorization"];

    jsonwebtoken.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        return res.status(200).json({
          success: false,
          message: "Token has expired",
          error: "token has expired",
        });
      } else {
        const data = decode;
        res.status(200).json({ success: true, data });
      }
    });
  } catch (error) {
    return res.status(200).json({
      success: false,
      message: "Token has expired",
      error: "token has expired",
    });
  }
};
