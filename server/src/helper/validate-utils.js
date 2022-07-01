import { check } from "express-validator";
import { UserService } from "user-management/services"

export const validateCreateUser = [
  check("username")
    .isLength({ min: 3 }).withMessage("Username must be at least 3 characters")
    .custom(async (value, { req }) => {
      if (value !== undefined && value !== null) {
        const users = await UserService.getByUsername(value);
        if (users !== null) {
          throw new Error("User with username exist");
        }
        return true;
      } else {
        return false;
      }
    }),
  check("fullname").isLength({ min: 5 }).withMessage("Fullname must be at least 5 characters"),
  check("email")
    .isEmail().withMessage("Invalid email format"),
  check("password")
    .matches(
      "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])(?=.{8,})"
    )
    .withMessage(
      "Passwords must contain at least eight characters, including uppercase, lowercase, special character letters and numbers"
    ),
  check("confirm")
    .custom((value, { req }) => {
      if (value != req.body.password) {
        throw new Error("Password confirmation does not match password");
      }
      return true;
    })
];
