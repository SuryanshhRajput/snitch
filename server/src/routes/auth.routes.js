import { Router } from "express";
import {
  loginValidator,
  registerValidator,
} from "../validators/auth.validators.js";
import { getMe, login, refresh, register } from "../controllers/auth.controller.js";
import { authenticate } from "../middlewares/auth.middlewares.js";

const router = Router();

router.post("/register", registerValidator, register);

router.get("/login", loginValidator, login);

router.post("/refresh", refresh);

router.get("/me", authenticate, getMe);


export default router;
