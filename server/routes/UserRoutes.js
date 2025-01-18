import { Router } from "express";
import { register, verifyOtp } from "../controllers/UserController.js";

const router = Router();

router.post('/register', register);
router.post('/verifyOtp', verifyOtp);

export default router;