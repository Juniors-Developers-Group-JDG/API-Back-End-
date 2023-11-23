import { Router } from "express";
import { login } from "../controllers/AuthController";
import { cadastro } from "../controllers/SignInController";

const router = Router();

router.post("/login", login);
router.post("/cadastro", cadastro);

export default router;
