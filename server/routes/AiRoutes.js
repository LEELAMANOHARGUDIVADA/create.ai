import { Router } from "express"
import { generateImage, generateText } from "../controllers/AIController.js";

const router = Router();

router.post('/generateText', generateText);
router.post('/generateImage', generateImage);

export default router;