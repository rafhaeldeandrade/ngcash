import { z } from 'zod'

import { Controller } from '@/presentation/contracts'
import { ZodSchemaValidate } from '@/presentation/helpers/zod-schema-validate'
import { LoadUserAccountBalanceController } from '@/presentation/controllers/load-user-account-balance'
import { LoadUserAccountBalanceUseCase } from '@/application/usecases/load-user-account-balance'
import { PostgreSQLAccountRepository } from '@/infra/postgresql/account-repository'

export function makeLoadUserAccountBalanceController(): Controller {
  const zodSchema = z.object({
    accountId: z.number()
  })
  const zodSchemaValidate = new ZodSchemaValidate(zodSchema)
  const postgreSQLAccountRepository = new PostgreSQLAccountRepository()
  const loadUserAccountBalanceUseCase = new LoadUserAccountBalanceUseCase(
    postgreSQLAccountRepository
  )
  return new LoadUserAccountBalanceController(
    zodSchemaValidate,
    loadUserAccountBalanceUseCase
  )
}
