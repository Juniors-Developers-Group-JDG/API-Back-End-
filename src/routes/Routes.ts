import { Router } from "express";
import { cadastro } from "../controllers/SignInController";

const router = Router();

router.post("/cadastro", cadastro);

export default router;
