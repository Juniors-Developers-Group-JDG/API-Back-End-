import { Router } from "express";
import { cadastro } from "../controllers/SignInController";
import { login } from "../controllers/AuthController";
import { forgotPassword, resetPassword, changePassword } from "../controllers/ForgotPasswordController";

const router = Router();

router.post("/cadastro", cadastro);
router.post("/login", login);
router.post('/recoverpassword', forgotPassword);
router.get('/resetpassword/:id/:token', resetPassword);
router.post('/resetpassword/:id/:token', changePassword);

export default router;
