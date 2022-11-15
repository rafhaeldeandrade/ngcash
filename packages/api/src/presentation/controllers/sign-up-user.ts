import {
  Controller,
  HttpRequest,
  HttpResponse,
  SchemaValidate
} from '@/presentation/contracts'
import { badRequest } from '@/presentation/helpers/http-helper'

export class SignUpUserController implements Controller {
  constructor(private readonly schemaValidate: SchemaValidate) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const error = await this.schemaValidate.validate(httpRequest.body)
    if (error) return badRequest(error)
    return null as unknown as HttpResponse
  }
}
