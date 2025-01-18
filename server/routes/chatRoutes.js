import { Router } from "express";
import { addMessage, getChatHistory } from "../controllers/ChatController.js";

const router = Router();

router.post('/addMessage', addMessage);
router.get('/ChatHistory/:chatId', getChatHistory);

export default router;