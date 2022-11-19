import { z } from 'zod'

import { Controller } from '@/presentation/contracts'
import { ZodSchemaValidate } from '@/presentation/helpers/zod-schema-validate'
import { LoadUserUseCase } from '@/application/usecases/load-user'
import PostgreSQLUserRepository from '@/infra/postgresql/user-repository'
import { AuthenticationMiddleware } from '@/presentation/middlewares/authentication'

export function makeAuthenticationMiddleware(): Controller {
  const zodSchema = z.string()
  const zodSchemaValidate = new ZodSchemaValidate(zodSchema)
  const postgreSQLUserRepository = new PostgreSQLUserRepository()
  const loadUserUseCase = new LoadUserUseCase(postgreSQLUserRepository)
  return new AuthenticationMiddleware(zodSchemaValidate, loadUserUseCase)
}
