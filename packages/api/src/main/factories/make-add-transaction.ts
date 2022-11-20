import { z } from 'zod'

import { Controller } from '@/presentation/contracts'
import { ZodSchemaValidate } from '@/presentation/helpers/zod-schema-validate'
import PostgreSQLUserRepository from '@/infra/postgresql/user-repository'
import { AddTransactionController } from '@/presentation/controllers/add-transaction'
import { AddTransactionUseCase } from '@/application/usecases/add-transaction'
import { PostgreSQLAccountRepository } from '@/infra/postgresql/account-repository'
import { PostgreSQLTransactionRepository } from '@/infra/postgresql/transaction-repository'
import prismaAdapter from '@/infra/postgresql/adapters/prisma-adapter'

export function makeAddTransactionController(): Controller {
  const zodSchema = z.object({
    usernameToCashIn: z.string(),
    amount: z.number(),
    authAccountId: z.number()
  })
  const zodSchemaValidate = new ZodSchemaValidate(zodSchema)
  const postgreSQLUserRepository = new PostgreSQLUserRepository()
  const postgreSQLAccountRepository = new PostgreSQLAccountRepository()
  const postgreSQLTransactionRepository = new PostgreSQLTransactionRepository()
  const prismaDbAdapter = prismaAdapter()
  const addTransactionUseCase = new AddTransactionUseCase(
    postgreSQLUserRepository,
    postgreSQLAccountRepository,
    postgreSQLTransactionRepository,
    prismaDbAdapter
  )
  return new AddTransactionController(zodSchemaValidate, addTransactionUseCase)
}
