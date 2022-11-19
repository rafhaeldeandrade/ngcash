import {
  Middleware,
  HttpRequest,
  HttpResponse,
  SchemaValidate
} from '@/presentation/contracts'
import { badRequest } from '@/presentation/helpers/http-helper'
import { errorAdapter } from '../helpers/error-adapter'

export class AuthenticationMiddleware implements Middleware {
  constructor(private readonly schemaValidate: SchemaValidate) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = await this.schemaValidate.validate(
        httpRequest.headers.authorization
      )
      if (error) return badRequest(error)
      return {
        statusCode: 200,
        body: null
      }
    } catch (e) {
      return errorAdapter(e as Error)
    }
  }
}
