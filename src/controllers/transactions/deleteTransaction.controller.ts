

import type { FastifyReply, FastifyRequest } from 'fastify';
import prisma from '../../config/prisma';
import type { DeleteTransactionParams } from '../../schemas/transaction.schema';

export const deleteTransaction = async (
  request: FastifyRequest<{ Params: DeleteTransactionParams }>,
  reply: FastifyReply,
): Promise<void> => {
  const userId = request.userId; // Substitua pelo ID do usuário autenticados
  const { id } = request.params;

  if (!userId) {
    reply.status(401).send({ error: 'Usuário não autenticado' });
    return;
  }

  try {
    const transaction = await prisma.transaction.findFirst({
      where: {
        id,
        userId,
      },
    });

    if (!transaction) {
      reply.status(400).send({ error: 'ID da transação inválido' });
      return;
    }

    await prisma.transaction.delete({ where: { id } });

    reply.status(200).send({ message: 'Transação deletada com sucesso!' });
  } catch (err) {
    request.log.error({ message: 'Erro ao deletar transação' });
    reply
      .status(500)
      .send({ error: 'Erro interno do servidor, falha ao deletar transação' });
  }
};
