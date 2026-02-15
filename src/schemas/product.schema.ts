import { z } from 'zod';

export const ProductSchema = z.object({
    name: z.string().min(3, { message: 'Name must be at least 3 characters long' }),
    price: z.number().min(0, { message: 'Price cannot be negative' }),
    description: z.string().optional(),
    category: z.string().min(3, { message: 'Category must be at least 3 characters long' }),
    stock: z.number().int().min(0, { message: 'Stock must be a non-negative integer' }),
});

export type ProductInput = z.infer<typeof ProductSchema>;

export const ProductArraySchema = z.array(ProductSchema);

