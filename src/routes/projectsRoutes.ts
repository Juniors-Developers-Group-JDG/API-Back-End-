import { Router } from "express";
import { createProject } from "../controllers/CreateProjectController";

const router = Router();

router.post("/novo", createProject);

export default router;
