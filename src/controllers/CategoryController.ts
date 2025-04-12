import { Request, Response } from 'express';
import { CategoryModel } from '../models/CategoryModel';
import { ICategory } from '../types/Category';
import mongoose from 'mongoose';

class CategoryController {
  static async createCategory(req: Request, res: Response) {
    try {
      const { name, type } = req.body;
      const userId = new mongoose.Types.ObjectId(req.userId);
      
      const category = await CategoryModel.create({ 
        name, 
        user: userId,
        type 
      });
      
      return res.status(201).json(category);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  static async getUserCategories(req: Request, res: Response) {
    try {
      const userId = new mongoose.Types.ObjectId(req.userId);
      const categories = await CategoryModel.getUserCategories(userId);
      return res.json(categories);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  static async updateCategory(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { name, type } = req.body;
      
      const category = await CategoryModel.findByIdAndUpdate(
        id,
        { name, type },
        { new: true }
      );
      
      if (!category) {
        return res.status(404).json({ message: 'Category not found' });
      }
      
      return res.json(category);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
}

export default CategoryController; 