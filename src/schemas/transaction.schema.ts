import { TransactionType } from "@prisma/client";
import { ObjectId } from "mongodb";
import { z } from "zod";

const isValidObjectId = (id: string): boolean => ObjectId.isValid(id);

export const createTransactionSchema = z.object({
  description: z
    .string()
    .min(1, { message: "Descrição obrigatória" }),

  amount: z
    .number()
    .positive({ message: "Valor deve ser positivo" }),

  date: z
    .coerce
    .date()
    .refine(
      (date) => !isNaN(date.getTime()),
      { message: "Data inválida" }
    ),

  categoryId: z
    .string()
    .refine(isValidObjectId, {
      message: "Categoria inválida",
    }),

  type: z.enum(
    [TransactionType.expense, TransactionType.income],
    {
      message: "Data inválida",
    }
  ),
});