import { Router } from "express";
import { signIn } from "../controllers/SignInController";
import { login } from "../controllers/AuthController";
import { forgotPassword } from "../controllers/ForgotPasswordController";
import { resetPassword } from "../controllers/ForgotPasswordController";
import { changePassword } from "../controllers/ForgotPasswordController";
import { updateUser } from "../controllers/UserController";

const router = Router();

router.post("/cadastro", signIn);
router.post("/login", login);
router.post("/recoverpassword", forgotPassword);
router.get("/resetpassword/:id/:token", resetPassword);
router.post("/resetpassword/:id/:token", changePassword);

router.patch("/user", updateUser);

export default router;
