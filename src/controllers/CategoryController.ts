import { Request, Response } from 'express';
import CategoryModel from '../models/CategoryModel';
import { ICategory } from '../types/Category';

class CategoryController {
  static async createCategory(req: Request, res: Response): Promise<void> {
    try {
      const { name, budget, userId } = req.body;
      const category = await CategoryModel.create({ name, budget, userId });
      res.status(201).json(category);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create category' });
    }
  }

  static async getUserCategories(req: Request, res: Response): Promise<void> {
    try {
      const { userId } = req.params;
      const categories = await CategoryModel.findByUserId(userId);
      res.status(200).json(categories);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch categories' });
    }
  }

  static async updateCategoryBudget(req: Request, res: Response): Promise<void> {
    try {
      const { categoryId } = req.params;
      const { budget } = req.body;
      const category = await CategoryModel.updateBudget(categoryId, budget);
      res.status(200).json(category);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update category budget' });
    }
  }
}

export default CategoryController; 