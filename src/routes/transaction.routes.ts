import type { FastifyInstance } from "fastify";
import createTransaction from "../controllers/transactions/createTransaction.controller";
import { zodToJsonSchema } from "zod-to-json-schema";
import { getTransactions } from "../controllers/transactions/getTransactions.controller";
import { getTransactionsSummary } from "../controllers/transactions/getTrasactionsSummary.controller";
import { 
  createTransactionSchema, 
  deleteTransactionSchema, 
  getHistoricalTransactionsSchema, 
  getTransactionSchema, 
  getTransactionsSummarySchema} 
from "../schemas/transaction.schema";
import { deleteTransaction } from "../controllers/transactions/deleteTransaction.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { getHistoricalTransaction } from "../controllers/transactions/getHistoricalTransactions.controller";

const transactionRoutes = async (fastify: FastifyInstance)=> {

  fastify.addHook("preHandler", authMiddleware)

  fastify.route({
    //Criação
    method: 'POST',
    url: '/',
    schema: {
      body: zodToJsonSchema(createTransactionSchema)
    },
    handler: createTransaction
  });

  //Buscar com filtro
  fastify.route({
    method: 'GET',
    url: '/',
    schema: {
      querystring: zodToJsonSchema(getTransactionSchema)
    },
    handler: getTransactions
  });

  //Buscar o resumo
  fastify.route({
    method: 'GET',
    url: '/summary',
    schema: {
      querystring: zodToJsonSchema(getTransactionsSummarySchema)
    },
    handler: getTransactionsSummary
  });

    //Histórico de Transações
  fastify.route({
    method: 'GET',
    url: '/historical',
    schema: {
      querystring: zodToJsonSchema(getHistoricalTransactionsSchema)
    },
    handler: getHistoricalTransaction
  });

  //Deletar
  fastify.route({
    method: 'DELETE',
    url: '/:id',
    schema: {
      params: zodToJsonSchema(deleteTransactionSchema)
    },
    handler: deleteTransaction })
};

export default transactionRoutes;