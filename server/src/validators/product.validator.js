import { body, validationResult } from "express-validator";

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

  body("sizes")
    .exists()
    .withMessage("Sizes are required")
    .bail()
    .isArray()
    .withMessage("Sizes must. be an array of object"),

  body("sizes.*.size")
    .exists()
    .withMessage("size must be present in every entry of size array")
    .bail()
    .trim()
    .isIn(["XS", "S", "M", "L", "XL", "XXL"])
    .withMessage("Size can be one of these XS, S , M , L , XL , XXL"),

  body("sizes.*.stock")
    .exists()
    .withMessage("Stocks must be present in every entry of the sizes array")
    .bail()
    .isInt({ min: 0 })
    .withMessage("Stocks must be a integer value"),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "Invalid request",
        errors: errors.array(),
      });
    }
    next();
  },
];

export const unlistProductValidator = [
  body("params")
    .exists()
    .withMessage("Product id is required")
    .bail()
    .isMongoId()
    .withMessage("Product id must be a valid Mongo Id"),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "Invalid data",
        errors: errors.array(),
      });
    }
  },
];

export const listProductValidator = [
  body("params")
    .exists()
    .withMessage("Product id is required")
    .bail()
    .isMongoId()
    .withMessage("Product id must be a valid Mongo Id"),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "Invalid data",
        errors: errors.array(),
      });
    }
  },
];