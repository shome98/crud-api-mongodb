import { Response } from 'express';

interface ResponseData {
    success: boolean;
    statusCode: number;
    message: string;
    data?: any;
}

export const sendResponse = (res: Response, statusCode: number, message: string, data: any = null) => {
    const response: ResponseData = {
        success: true,
        statusCode,
        message: `${message} ✨`, // Adding emoji for extra flair as requested
        data,
    };
    res.status(statusCode).json(response);
};

export const sendError = (res: Response, statusCode: number, message: string, error: any = null) => {
    const response: ResponseData = {
        success: false,
        statusCode,
        message: `${message} ⚠️`, // Adding warning emoji
        data: error,
    };
    res.status(statusCode).json(response);
};
