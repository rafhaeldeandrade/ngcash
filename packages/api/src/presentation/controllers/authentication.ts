import { Authentication } from '@/domain/usecases/authentication'
import {
  Controller,
  HttpRequest,
  HttpResponse,
  SchemaValidate
} from '@/presentation/contracts'
import { badRequest, ok } from '@/presentation/helpers/http-helper'
import { errorAdapter } from '@/presentation/helpers/error-adapter'

export class AuthenticationController implements Controller {
  constructor(
    private readonly schemaValidate: SchemaValidate,
    private readonly authenticationUseCase: Authentication
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = await this.schemaValidate.validate(httpRequest.body)
      if (error) return badRequest(error)
      const result = await this.authenticationUseCase.execute({
        username: httpRequest.body.username,
        password: httpRequest.body.password
      })
      return ok(result)
    } catch (e) {
      return errorAdapter(e as Error)
    }
  }
}
