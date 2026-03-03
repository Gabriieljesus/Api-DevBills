import type { FastifyInstance } from "fastify";
import createTransaction from "../controllers/transactions/createTransaction.controller";
import { zodToJsonSchema } from "zod-to-json-schema";
import { 
  createTransactionSchema, 
  getTransactionSchema } 
from "../schemas/transaction.schema";
import { getTransactions } from "../controllers/transactions/getTransactions.controller";

const transactionRoutes = async (fastify: FastifyInstance)=> {
  fastify.route({
    //Criação
    method: 'POST',
    url: '/',
    schema: {
      body: zodToJsonSchema(createTransactionSchema as any)
    },
    handler: createTransaction
  });

  //Buscar com filtro
  fastify.route({
    method: 'GET',
    url: '/',
    schema: {
      querystring: zodToJsonSchema(getTransactionSchema as any)
    },
    handler: getTransactions
  })
};

export default transactionRoutes;