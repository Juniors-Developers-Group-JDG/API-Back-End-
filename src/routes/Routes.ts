import { Router } from "express";
import { cadastro } from "../controllers/AuthController";

const router = Router();

router.post("/cadastro", cadastro);

export default router;
