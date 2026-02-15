import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { sendError } from '../utils/response';

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    // Only log stack trace for 500 errors or unknown errors
    // if (!err.statusCode && !err.kind && err.name !== 'ZodError' && err.name !== 'ValidationError') {
    //     console.error(err.stack);
    // } else {
    //     // For handled errors, just log the message to keep console clean
    //     console.log(`Error: ${err.message} ⚠️`);
    // }

    // Zod Validation Error
    if (err instanceof ZodError) {
        const errorMessages = err.issues.map((issue: any) => ({
            message: `${issue.path.join('.')} : ${issue.message} 🚫`,
        }));
        return sendError(res, 400, 'Validation Error', errorMessages);
    }

    // Mongoose Validation Error
    if (err.name === 'ValidationError') {
        const errorMessages = Object.values(err.errors).map((val: any) => ({
            message: val.message,
        }));
        return sendError(res, 400, 'Mongoose Validation Error 🛑', errorMessages);
    }

    // Mongoose Duplicate Key Error
    if (err.code === 11000) {
        const message = `Duplicate field value entered ⛔`;
        return sendError(res, 400, message);
    }

    // Mongoose Cast Error
    if (err.name === 'CastError') {
        const message = `Resource not found. Invalid: ${err.path} 🔍`;
        if (err.kind === 'ObjectId') {
            return sendError(res, 400, `Invalid ID format 🆔`, message);
        }
        return sendError(res, 404, message);
    }

    // Default Error
    return sendError(res, 500, 'Server Error 💥', err.message);
};

export default errorHandler;