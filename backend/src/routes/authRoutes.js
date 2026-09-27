import express from 'express';
import authController from '../controllers/authController.js';
import authenticateMiddleware from '../middleware/authenticate.js';

const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.get('/me', authenticateMiddleware, authController.me);

export default router;
