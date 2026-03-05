import type { TransactionType } from '@prisma/client';
import type { CategorySummary } from './category.types';

export interface TransactionFilter {
  userId: string;
  date?: {
    gte: Date;
    lte: Date;
  };
  type?: TransactionType;
  categoryId?: string;
}
// gte: greater than or equal = Maior ou igual
// lte: less than or equal = Menor ou igual

export interface TransactionSummary {
  totalExpenses: number;
  totalIncomes: number;
  balance: number;
  expensesBycategory: CategorySummary[];
}
