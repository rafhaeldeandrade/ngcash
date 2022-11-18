import { z } from 'zod'

import env from '@/main/config/env'
import { Controller } from '@/presentation/contracts'
import { LoginController } from '@/presentation/controllers/login'
import { ZodSchemaValidate } from '@/presentation/helpers/zod-schema-validate'
import PostgreSQLUserRepository from '@/infra/postgresql/user-repository'
import { Argon2Adapter } from '@/infra/argon2/argon2-adapter'
import { JWTAdapter } from '@/infra/jwt/jwt-adapter'
import { LoginUseCase } from '@/application/usecases/login'

export function makeLoginController(): Controller {
  const zodSchema = z.object({
    username: z.string(),
    password: z.string()
  })
  const zodSchemaValidate = new ZodSchemaValidate(zodSchema)
  const postgreSQLUserRepository = new PostgreSQLUserRepository()
  const argon2Hasher = new Argon2Adapter(env.argon2Options)
  const jwtEncrypter = new JWTAdapter(env.jwtSecret)
  const loginUseCase = new LoginUseCase(
    postgreSQLUserRepository,
    argon2Hasher,
    jwtEncrypter
  )
  return new LoginController(zodSchemaValidate, loginUseCase)
}
