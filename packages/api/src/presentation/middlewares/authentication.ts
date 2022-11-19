import {
  Middleware,
  HttpRequest,
  HttpResponse,
  SchemaValidate
} from '@/presentation/contracts'

export class AuthenticationMiddleware implements Middleware {
  constructor(private readonly schemaValidate: SchemaValidate) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    await this.schemaValidate.validate(httpRequest.headers.authorization)
    return {
      statusCode: 200,
      body: null
    }
  }
}
