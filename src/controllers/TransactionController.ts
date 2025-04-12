import mongoose from 'mongoose';  // Importando mongoose
import { Request, Response } from 'express';
import TransactionService from '../services/TransactionService';
import { ITransaction } from '../types/Transaction';

class TransactionController {
  async createTransaction(req: Request, res: Response): Promise<void> {
    try {
      const transactionData: ITransaction = req.body;

      await TransactionService.createTransaction(transactionData);

      res.status(201).json({
        message: 'Transação criada com sucesso!',
      });
    } catch (error: any) {
      res.status(400).json({
        error: error.message,
      });
    }
  }

  async getUserTransactions(req: Request, res: Response): Promise<void> {
    try {
      const { userId } = req.params;
      const { month, year } = req.query;

      if (!month || !year) {
        throw new Error('Mês e ano são obrigatórios.');
      }

      const userObjectId = new mongoose.Types.ObjectId(userId);
      const transactions = await TransactionService.getUserTransactions(
        userObjectId.toString(),
        parseInt(month as string),
        parseInt(year as string)
      );

      res.status(200).json(
        transactions,
      );
    } catch (error: any) {
      res.status(400).json({
        error: error.message,
      });
    }
  }
}
export default new TransactionController();

