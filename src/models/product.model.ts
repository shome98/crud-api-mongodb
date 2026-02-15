import mongoose, { Schema, Document } from 'mongoose';
import { ProductInput } from '../schemas/product.schema';

export interface IProduct extends ProductInput, Document {
    createdAt: Date;
    updatedAt: Date;
}

const ProductSchema: Schema = new Schema(
    {
        name: { type: String, required: true, trim: true },
        price: { type: Number, required: true },
        description: { type: String },
        category: { type: String, required: true },
        stock: { type: Number, required: true, default: 0 },
    },
    {
        timestamps: true,
    }
);

export const ProductModel = mongoose.model<IProduct>('Product', ProductSchema);
