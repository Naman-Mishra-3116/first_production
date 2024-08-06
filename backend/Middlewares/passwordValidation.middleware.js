import Joi from "joi";

export const passWordValidationMiddeWare = function (req, res, next) {
  try {
    const { currentPassword, newPassword, confirmPassword } = req.body;
    if (newPassword != confirmPassword) {
      return res.status(400).json({
        error: true,
        success: false,
        message: "Passwords do not match!",
      });
    }
    const schema = Joi.object({
      currentPassword: Joi.string().min(6).max(20).required(),
      newPassword: Joi.string().min(6).max(20).required(),
      confirmPassword: Joi.string().min(6).max(20).required(),
    });

    const { error } = schema.validate({
      currentPassword,
      newPassword,
      confirmPassword,
    });
    if (error) {
      return res.status(400).json({
        error: error.message,
        success: false,
        message: "Current Password should contain at least 6 character",
      });
    }
    next();
  } catch (error) {
    console.log(error);
  }
};
