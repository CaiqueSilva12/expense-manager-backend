import 'dotenv/config';
import express, { Application } from 'express';
import cors from 'cors';
import Database from './config/Database';
import UserRoutes from './routes/UserRoutes';
import TransactionRoutes from './routes/TransactionRoutes';

class App {
  private app: Application;
  private port: number;

  constructor() {
    this.app = express();
    this.port = Number(process.env.PORT) || 3000;

    this.middlewares();
    this.routes();
    this.database();
  }

  private middlewares(): void {
    this.app.use(cors());
    this.app.use(express.json());
  }

  private routes(): void {
    this.app.use('/api', UserRoutes);
    this.app.use('/api', TransactionRoutes);
  }

  private async database(): Promise<void> {
    await Database.connect();
  }

  public listen(): void {
    this.app.listen(this.port, () => {
      console.log(`Servidor rodando na porta ${this.port}`);
    });
  }
}

const app = new App();
app.listen();
