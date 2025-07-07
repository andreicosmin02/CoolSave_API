import express from 'express';
import {
    createFoodProduct,
    getAllFoodProducts,
    getFoodProductById,
    updateFoodProduct,
    deleteFoodProduct
} from '../controllers/foodProduct.controller';

const router = express.Router();

// FoodProduct routes
router.post('/food-products', createFoodProduct);
router.get('/food-products', getAllFoodProducts);
router.get('/food-products/:id', getFoodProductById);
router.put('/food-products/:id', updateFoodProduct);
router.delete('/food-products/:id', deleteFoodProduct);

export default router;