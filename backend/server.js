import express from 'express';
import cors from 'cors';
import { errorHandler } from './src/middleware/errorHandler.js';
import apiRouter from './src/routes/api.js';

const app = express();

const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173';

// Allows frontend to access responses from server
app.use(
    cors({
        origin: clientUrl,
        credentials: true,
    })
);

app.use(express.json());
app.use('/api', apiRouter);

app.get('/health', (req, res) => {
    res.status(200).send('OK');
});

app.use(errorHandler); // should be after all middlewares and routes

const PORT = process.env.PORT;

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
});
