import Joi from "joi";
export const emailValidationMiddleWareForUpdateEmail = function (
  req,
  res,
  next
) {
  try {
    const { email } = req.body;

    const schema = Joi.object({
      email: Joi.string().email().required(),
    });

    const { error } = schema.validate({
      email,
    });
    if (error) {
      return res.status(200).json({
        message: error.message,
        success: false,
        error: true,
      });
    }
    next();
  } catch (error) {
    return res.status(200).json({
      message: error.message,
      success: false,
      error: true,
    });
  }
};
