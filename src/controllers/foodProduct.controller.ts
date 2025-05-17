import { Request, Response } from "express";
import FoodProduct from '../models/FoodProduct';

// Create a new Food Product
export const createFoodProduct = async (req: Request, res: Response): Promise<any> => {
    try {
        const { name, category, expirationDate } = req.body;
        const foodProduct = new FoodProduct({
            name,
            category,
            expirationDate
        });

        const savedProduct = await foodProduct.save();
        res.status(201).json(savedProduct);
    } catch (error: any) {
        res.status(400).json({
            message: error.message || 'Error creating food product'
        });
    }
};

// Get all Food Products
export const getAllFoodProducts = async (req: Request, res: Response): Promise<any> => {
    try {
        const foodProducts = await FoodProduct.find();
        res.status(200).json(foodProducts);
    } catch (error: any) {
        res.status(500).json({
            message: error.message || 'Error retrieving food products'
        });
    }
};

// Get a single Food Product by ID
export const getFoodProductById = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params;
        const foodProduct = await FoodProduct.findById(id);

        if (!foodProduct) {
            return res.status(404).json({ message: 'Food product not found' });
        }

        res.status(200).json(foodProduct);
    } catch (error: any) {
        res.status(500).json({
            message: error.message || 'Error retrieving food product'
        });
    }
};


// Update a Food Product by ID
export const updateFoodProduct = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const updatedProduct = await FoodProduct.findByIdAndUpdate(
            id,
            updates,
            { new: true, runValidators: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({ message: 'Food product not found' });
        }

        res.status(200).json(updatedProduct);
    } catch (error: any) {
        res.status(400).json({
            message: error.message || 'Error updating food product'
        });
    }
};

// Delete a Food Product by ID
export const deleteFoodProduct = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params;
        const deletedProduct = await FoodProduct.findByIdAndDelete(id);

        if (!deletedProduct) {
            return res.status(404).json({ message: 'Food product not found' });
        }

        res.status(200).json({ message: 'Food product deleted successfully' });
    } catch (error: any) {
        res.status(500).json({
            message: error.message || 'Error deleting food product'
        });
    }
};