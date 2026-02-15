import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import routes from './routes';
import errorHandler from './middleware/errorHandler';
import { sendResponse } from './utils/response';

const app: Application = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', routes);

// Base route for health check
app.get('/', (req: Request, res: Response) => {
    console.log('Root endpoint hit! 🎯');
    sendResponse(res, 200, 'Welcome to the CRUD API 🚀');
});

// 404 Handler
app.use((req: Request, res: Response, next: NextFunction) => {
    const error = new Error('Not Found');
    (error as any).status = 404;
    next(error);
});

// Global Error Handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    errorHandler(err, req, res, next);
});

export default app;
