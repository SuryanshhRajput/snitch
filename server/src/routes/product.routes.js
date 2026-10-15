import { Router } from "express";
import {
  authenticate,
  authenticateSeller,
} from "../middlewares/auth.middlewares.js";
import multer from "multer";
import {
  createProduct,
  getAllProduct,
  listAllProductsToSeller,
  listProduct,
  unlistProduct,
} from "../controllers/product.controller.js";
import {
  createProductValidator,
  listProductValidator,
  unlistProductValidator,
} from "../validators/product.validator.js";

const router = Router();

const uploads = multer({
  storage: multer.memoryStorage(),
});
//create product
router.post(
  "/",
  authenticate,
  (req, res, next) => {
    if (req.user.role !== "seller") {
      return res.status(403).json({
        message: "user is not authorise to create products",
      });
    }
    next();
  },
  uploads.array("images"),
  (req, res, next) => {
    req.body.price = JSON.parse(req.body.price);
    req.body.sizes = JSON.parse(req.body.sizes);

    next();
  },
  createProductValidator,
  createProduct,
);

// get all product

router.get("/", authenticate, getAllProduct);

// seeller will see all the products

router.get(
  "/seller",
  authenticate,
  authenticateSeller,
  listAllProductsToSeller,
);

//unlist product y its id

router.patch(
  "/unlist/:id",
  authenticate,
  authenticateSeller,
  unlistProductValidator,
  unlistProduct,
);

router.patch(
  "/list/:id",
  authenticate,
  authenticateSeller,
  listProductValidator,
  listProduct,
);

export default router;
