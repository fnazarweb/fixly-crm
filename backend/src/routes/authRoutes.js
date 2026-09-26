import express from 'express';
import authController from '../controllers/authController.js';
import authenticateMiddleware from '../middleware/authenticate.js';
import authorizeMiddleware from '../middleware/authorize.js';

const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.get(
    '/me',
    authenticateMiddleware,
    authorizeMiddleware,
    authController.me
);

export default router;
