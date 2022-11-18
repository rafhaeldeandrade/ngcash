import { z } from 'zod'

import env from '@/main/config/env'
import { Controller } from '@/presentation/contracts'
import { SignUpUserController } from '@/presentation/controllers/sign-up-user'
import { ZodSchemaValidate } from '@/presentation/helpers/zod-schema-validate'
import { SignUpUserUseCase } from '@/application/usecases/sign-up-user'
import PostgreSQLUserRepository from '@/infra/postgresql/user-repository'
import { Argon2Adapter } from '@/infra/argon2/argon2-adapter'
import { JWTAdapter } from '@/infra/jwt/jwt-adapter'

export function makeSignUpUserController(): Controller {
  const zodSchema = z.object({
    username: z.string().min(3).max(20),
    password: z
      .string()
      .min(8)
      .max(100)
      .regex(
        /(?=[A-Za-z0-9@#$%^&+!=]+$)^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,}).*$/
      )
  })
  const zodSchemaValidate = new ZodSchemaValidate(zodSchema)
  const postgreSQLUserRepository = new PostgreSQLUserRepository()
  const argon2Hasher = new Argon2Adapter(env.argon2Options)
  const jwtEncrypter = new JWTAdapter(env.jwtSecret)
  const signUpUserUseCase = new SignUpUserUseCase(
    postgreSQLUserRepository,
    argon2Hasher,
    jwtEncrypter
  )
  return new SignUpUserController(zodSchemaValidate, signUpUserUseCase)
}
