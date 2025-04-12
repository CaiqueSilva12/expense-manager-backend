import { Request, Response } from 'express';
import CategoryModel from '../models/CategoryModel';
import { ICategory } from '../types/Category';

export class CategoryController {
  static async createCategory(req: Request, res: Response): Promise<void> {
    try {
      const categoryData: ICategory = req.body;
      const category = await CategoryModel.create(categoryData);
      res.status(201).json(category);
    } catch (error) {
      res.status(500).json({ message: 'Error creating category' });
    }
  }

  static async getCategories(req: Request, res: Response): Promise<void> {
    try {
      const categories = await CategoryModel.find();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching categories' });
    }
  }

  static async getCategoryById(req: Request, res: Response): Promise<void> {
    try {
      const category = await CategoryModel.findById(req.params.id);
      if (!category) {
        res.status(404).json({ message: 'Category not found' });
        return;
      }
      res.json(category);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching category' });
    }
  }

  static async updateCategory(req: Request, res: Response): Promise<void> {
    try {
      const category = await CategoryModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!category) {
        res.status(404).json({ message: 'Category not found' });
        return;
      }
      res.json(category);
    } catch (error) {
      res.status(500).json({ message: 'Error updating category' });
    }
  }

  static async deleteCategory(req: Request, res: Response): Promise<void> {
    try {
      const category = await CategoryModel.findByIdAndDelete(req.params.id);
      if (!category) {
        res.status(404).json({ message: 'Category not found' });
        return;
      }
      res.json({ message: 'Category deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting category' });
    }
  }
} 