import { SignUpUser } from '@/domain/usecases/sign-up-user'
import {
  Controller,
  HttpRequest,
  HttpResponse,
  SchemaValidate
} from '@/presentation/contracts'
import {
  badRequest,
  internalServerError
} from '@/presentation/helpers/http-helper'
import { errorAdapter } from '../helpers/error-adapter'

export class SignUpUserController implements Controller {
  constructor(
    private readonly schemaValidate: SchemaValidate,
    private readonly signUpUserUseCase: SignUpUser
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = await this.schemaValidate.validate(httpRequest.body)
      if (error) return badRequest(error)
      await this.signUpUserUseCase.signUp({
        username: httpRequest.body.username,
        password: httpRequest.body.password
      })
      return null as unknown as HttpResponse
    } catch (e) {
      return errorAdapter(e as Error)
    }
  }
}
