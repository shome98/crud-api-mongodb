import { Request, Response, NextFunction } from 'express';
import { ProductModel } from '../models/product.model';
import { ProductSchema, ProductArraySchema } from '../schemas/product.schema';
import { sendResponse, sendError } from '../utils/response';
import { ZodError } from 'zod';

export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const validatedData = ProductSchema.parse(req.body);
        const product = await ProductModel.create(validatedData);
        sendResponse(res, 201, 'Product created successfully', product);
    } catch (error) {
        if (error instanceof ZodError) {
            next(error); // Pass Zod errors to global handler
        } else {
            next(error); // Pass other errors
        }
    }
};

export const createProductsBulk = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const validatedData = ProductArraySchema.parse(req.body);
        const products = await ProductModel.insertMany(validatedData);
        sendResponse(res, 201, `${products.length} Products created successfully 📦`, products);
    } catch (error) {
        next(error);
    }
};

export const getProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const products = await ProductModel.find();
        sendResponse(res, 200, 'Products fetched successfully', products);
    } catch (error) {
        next(error);
    }
};

export const getProductById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const product = await ProductModel.findById(req.params.id);
        if (!product) {
            return sendError(res, 404, 'Product not found');
        }
        sendResponse(res, 200, 'Product fetched successfully', product);
    } catch (error) {
        next(error);
    }
};

export const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const validatedData = ProductSchema.partial().parse(req.body); // Allow partial updates
        const product = await ProductModel.findByIdAndUpdate(req.params.id, validatedData, { new: true });
        if (!product) {
            return sendError(res, 404, 'Product not found');
        }
        sendResponse(res, 200, 'Product updated successfully', product);
    } catch (error) {
        next(error);
    }
};

export const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const product = await ProductModel.findByIdAndDelete(req.params.id);
        if (!product) {
            return sendError(res, 404, 'Product not found');
        }
        sendResponse(res, 200, 'Product deleted successfully', null);
    } catch (error) {
        next(error);
    }
};
