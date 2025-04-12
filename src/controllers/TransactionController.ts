import { Request, Response } from 'express';
import { TransactionService } from '../services/TransactionService';
import { ITransaction } from '../types/Transaction';

export class TransactionController {
  static async createTransaction(req: Request, res: Response): Promise<void> {
    try {
      const transactionData: Omit<ITransaction, 'id'> = req.body;
      const transaction = await TransactionService.createTransaction(transactionData);
      res.status(201).json(transaction);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Internal server error' });
      }
    }
  }

  static async getTransactions(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.userId;
      if (!userId) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
      }

      const transactions = await TransactionService.getTransactionsByUser(userId);
      res.json(transactions);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Internal server error' });
      }
    }
  }

  static async getTransactionById(req: Request, res: Response): Promise<void> {
    try {
      const transaction = await TransactionService.getTransactionById(req.params.id);
      if (!transaction) {
        res.status(404).json({ message: 'Transaction not found' });
        return;
      }
      res.json(transaction);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Internal server error' });
      }
    }
  }

  static async updateTransaction(req: Request, res: Response): Promise<void> {
    try {
      const transaction = await TransactionService.updateTransaction(
        req.params.id,
        req.body
      );
      if (!transaction) {
        res.status(404).json({ message: 'Transaction not found' });
        return;
      }
      res.json(transaction);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Internal server error' });
      }
    }
  }

  static async deleteTransaction(req: Request, res: Response): Promise<void> {
    try {
      await TransactionService.deleteTransaction(req.params.id);
      res.json({ message: 'Transaction deleted successfully' });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Internal server error' });
      }
    }
  }
}
