import express from 'express';
import authController from '../controllers/authController.js';
import authenticateMiddleware from '../middleware/authenticate.js';
import { validate } from '../middleware/validate.js';
import { loginSchema, registerSchema } from '../validation/authSchema.js';

const router = express.Router();

router.post('/register', validate(registerSchema), authController.register);
router.post('/login', validate(loginSchema), authController.login);
router.post('/logout', authController.logout);
router.get('/me', authenticateMiddleware, authController.me);

export default router;
