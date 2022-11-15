import {
  Controller,
  HttpRequest,
  HttpResponse,
  SchemaValidate
} from '@/presentation/contracts'

export class SignUpUserController implements Controller {
  constructor(private readonly schemaValidate: SchemaValidate) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    await this.schemaValidate.validate(httpRequest.body)
    return null as unknown as HttpResponse
  }
}
