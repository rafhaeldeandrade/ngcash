import { z } from 'zod'

import env from '@/main/config/env'
import { Controller } from '@/presentation/contracts'
import { ZodSchemaValidate } from '@/presentation/helpers/zod-schema-validate'
import { LoadUserUseCase } from '@/application/usecases/load-user'
import PostgreSQLUserRepository from '@/infra/postgresql/user-repository'
import { AuthenticationMiddleware } from '@/presentation/middlewares/authentication'
import { JWTAdapter } from '@/infra/jwt/jwt-adapter'

export function makeAuthenticationMiddleware(): Controller {
  const zodSchema = z.string()
  const zodSchemaValidate = new ZodSchemaValidate(zodSchema)
  const JWTDecrypter = new JWTAdapter(env.jwtSecret)
  const postgreSQLUserRepository = new PostgreSQLUserRepository()
  const loadUserUseCase = new LoadUserUseCase(
    JWTDecrypter,
    postgreSQLUserRepository
  )
  return new AuthenticationMiddleware(zodSchemaValidate, loadUserUseCase)
}
