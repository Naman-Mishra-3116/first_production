import joi from "joi";

export const loginValidationMiddleware = function (req, res, next) {
  const { email, password } = req.body;
  const schema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(6).max(20).required(),
  });

  const { error } = schema.validate({ email, password });
  if (error) {
    return res.status(400).json({
      message: "Please check values in the input field",
      error: error.message,
      success: false,
    });
  }
  next();
};
