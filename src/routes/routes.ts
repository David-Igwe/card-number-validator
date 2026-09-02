import { Router } from "express";
import { validateCard } from "../controllers/controller";

const router = Router();

router.post("/validate", validateCard);

export default router;