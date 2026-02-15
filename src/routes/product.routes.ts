import { Router } from 'express';
import {
    createProduct,
    createProductsBulk,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct,
} from '../controllers/product.controller';
import limiter from '../middleware/rateLimiter';

const router = Router();

// Apply rate limiting to all product routes
router.use(limiter);

router.post('/bulk', createProductsBulk);
router.post('/', createProduct);
router.get('/', getProducts);
router.get('/:id', getProductById);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

export default router;
