import { Router } from "express";
import { validateCardController } from "../controllers/controller";
import { inputMiddleware} from "../middleware/inputMiddleware";

const router = Router();

router.post("/validate", inputMiddleware, validateCardController);

export default router;