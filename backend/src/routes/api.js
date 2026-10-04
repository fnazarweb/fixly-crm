import express from 'express';
import authRouter from './authRoutes.js';
import customerRouter from './customerRoutes.js';

const apiRouter = express.Router();

apiRouter.use('/auth', authRouter);
apiRouter.use('/customers', customerRouter);

export default apiRouter;
