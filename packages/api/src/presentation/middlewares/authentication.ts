import { LoadUser } from '@/domain/usecases/load-user'
import {
  Middleware,
  HttpRequest,
  HttpResponse,
  SchemaValidate
} from '@/presentation/contracts'
import { badRequest, ok } from '@/presentation/helpers/http-helper'
import { errorAdapter } from '../helpers/error-adapter'

export class AuthenticationMiddleware implements Middleware {
  constructor(
    private readonly schemaValidate: SchemaValidate,
    private readonly loadUserUseCase: LoadUser
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = await this.schemaValidate.validate(
        httpRequest.headers.authorization
      )
      if (error) return badRequest(error)
      const result = await this.loadUserUseCase.execute(
        httpRequest.headers.authorization
      )

      return ok({
        user: result
      })
    } catch (e) {
      return errorAdapter(e as Error)
    }
  }
}
