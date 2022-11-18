import { SignUpUser } from '@/domain/usecases/sign-up-user'
import {
  Controller,
  HttpRequest,
  HttpResponse,
  SchemaValidate
} from '@/presentation/contracts'
import { badRequest, created, ok } from '@/presentation/helpers/http-helper'
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
      const result = await this.signUpUserUseCase.execute({
        username: httpRequest.body.username,
        password: httpRequest.body.password
      })
      return created(result)
    } catch (e) {
      console.log(e)
      return errorAdapter(e as Error)
    }
  }
}
