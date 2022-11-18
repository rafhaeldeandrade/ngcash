import { Login } from '@/domain/usecases/login'
import {
  Controller,
  HttpRequest,
  HttpResponse,
  SchemaValidate
} from '@/presentation/contracts'
import { badRequest, ok } from '@/presentation/helpers/http-helper'
import { errorAdapter } from '@/presentation/helpers/error-adapter'

export class LoginController implements Controller {
  constructor(
    private readonly schemaValidate: SchemaValidate,
    private readonly loginUseCase: Login
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = await this.schemaValidate.validate(httpRequest.body)
      if (error) return badRequest(error)
      const result = await this.loginUseCase.execute({
        username: httpRequest.body.username,
        password: httpRequest.body.password
      })
      return ok(result)
    } catch (e) {
      return errorAdapter(e as Error)
    }
  }
}
