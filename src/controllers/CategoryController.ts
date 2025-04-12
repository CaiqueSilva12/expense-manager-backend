import { Request, Response } from 'express';
import CategoryModel from '../models/CategoryModel';
import { ICategory } from '../types/Category';
import mongoose from 'mongoose';

class CategoryController {
  static async createCategory(req: Request, res: Response): Promise<void> {
    try {
      const { name, budget, userId } = req.body;
      
      if (!name || !budget || !userId) {
        res.status(400).json({ error: 'Missing required fields' });
        return;
      }

      const categoryData: ICategory = {
        name,
        budget,
        userId: new mongoose.Types.ObjectId(userId)
      };

      const category = await CategoryModel.create(categoryData);
      res.status(201).json(category);
    } catch (error) {
      console.error('Error creating category:', error);
      res.status(500).json({ error: 'Failed to create category' });
    }
  }

  static async getUserCategories(req: Request, res: Response): Promise<void> {
    try {
      const { userId } = req.params;
      
      if (!userId) {
        res.status(400).json({ error: 'User ID is required' });
        return;
      }

      console.log('Fetching categories for user:', userId);
      const categories = await CategoryModel.findByUserId(userId);
      console.log('Found categories:', categories);
      
      if (!categories || categories.length === 0) {
        res.status(200).json([]);
        return;
      }

      res.status(200).json(categories);
    } catch (error) {
      console.error('Error fetching categories:', error);
      res.status(500).json({ error: 'Failed to fetch categories' });
    }
  }

  static async updateCategoryBudget(req: Request, res: Response): Promise<void> {
    try {
      const { categoryId } = req.params;
      const { budget } = req.body;
      
      if (!categoryId || budget === undefined) {
        res.status(400).json({ error: 'Category ID and budget are required' });
        return;
      }

      console.log('Updating category budget:', { categoryId, budget });
      const category = await CategoryModel.updateBudget(categoryId, budget);
      
      if (!category) {
        res.status(404).json({ error: 'Category not found' });
        return;
      }

      res.status(200).json(category);
    } catch (error) {
      console.error('Error updating category budget:', error);
      res.status(500).json({ error: 'Failed to update category budget' });
    }
  }
}

export default CategoryController; 