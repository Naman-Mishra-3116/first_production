import Joi from "joi";
export const passWordValidationMiddeWareForResetPassword = function (
  req,
  res,
  next
) {
  try {
    const { password, confirmPassword } = req.body;
    if (password != confirmPassword) {
      alert("password do not match");
    }
    const schema = Joi.object({
      password: Joi.string().min(6).max(20).required(),
      confirmPassword: Joi.string().min(6).max(20).required(),
    });

    const { error } = schema.validate({
      password,
      confirmPassword,
    });
    if (error) {
      alert(error.message);
    }
    next();
  } catch (error) {
    alert(error.message);
  }
};
