import { check, checkExact } from "express-validator"

export const loginValidation = () => [
  check("email", "email must be vaild").isEmail(),
  check("password", "password is required").notEmpty(),
  checkExact(),
]

export const forgotPasswordValidation = () => [check("email", "email must be vaild").isEmail(), checkExact()]

export const resetPasswordValidation = () => [
  check("email", "email must be vaild").isEmail(),
  check("password", "Password at least 6 char").isLength({ min: 6 }),
  check("password_confirmed", "password confimation is required")
    .notEmpty()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Password doesn't match")
      }
      return true
    }),
  checkExact(),
]

export const tempPasswordValidation = () => [check("email", "email must be vaild").isEmail(), checkExact()]
