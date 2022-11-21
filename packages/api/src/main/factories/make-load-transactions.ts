import { z } from 'zod'

import { Controller } from '@/presentation/contracts'
import { ZodSchemaValidate } from '@/presentation/helpers/zod-schema-validate'
import { LoadTransactionsController } from '@/presentation/controllers/load-transactions'
import { LoadTransactionsUseCase } from '@/application/usecases/load-transactions'
import { PostgreSQLTransactionRepository } from '@/infra/postgresql/transaction-repository'

export function makeLoadTransactionsController(): Controller {
  const zodSchema = z.object({
    page: z.number().optional(),
    transactionType: z.enum(['all', 'cashIn', 'cashOut']),
    date: z
      .preprocess((arg) => {
        if (typeof arg == 'string' || arg instanceof Date) return new Date(arg)
      }, z.date())
      .optional()
  })
  const zodSchemaValidate = new ZodSchemaValidate(zodSchema)
  const postgreSQLTransactionRepository = new PostgreSQLTransactionRepository()
  const loadTransactionsUseCase = new LoadTransactionsUseCase(
    postgreSQLTransactionRepository
  )
  return new LoadTransactionsController(
    zodSchemaValidate,
    loadTransactionsUseCase
  )
}
