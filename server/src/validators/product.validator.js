import { body } from "express-validator";

export const createProductValidator = [
  body("title")
    .exists()
    .withMessage("Title is required")
    .bail()
    .isString()
    .withMessage("Title must be a string")
    .bail()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage("Title length must be between 2 and 100 characters"),

  body("description")
    .exists()
    .withMessage("Description is required")
    .bail()
    .isString()
    .withMessage("Description must be a string")
    .bail()
    .trim()
    .isLength({ min: 2, max: 1000 })
    .withMessage("Description length must be between 2 and 1000 characters"),

  body("price.amount")
    .exists()
    .withMessage("Price amount is required")
    .bail()
    .isFloat({ min: 0 })
    .withMessage("Price amount must be a non-negative number")
    .bail()
    .toFloat(),

  body("price.currency")
    .exists()
    .withMessage("Price currency is required")
    .bail()
    .isString()
    .withMessage("Price currency must be a string")
    .bail()
    .trim()
    .isLength({ min: 3, max: 3 })
    .withMessage("Price currency must be a 3-letter ISO code")
    .bail()
    .toUpperCase()
    .isIn(["USD", "INR"])
    .withMessage("Price currency must be one of USD, INR"),
];
