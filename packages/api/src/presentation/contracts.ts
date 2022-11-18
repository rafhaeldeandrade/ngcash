export type HttpRequest = {
  body?: any
  user?: {
    id: number
    accountId: number
  }
}

export type HttpResponse = {
  statusCode: number
  body: any
}

export interface Controller {
  handle(httpRequest: HttpRequest): Promise<HttpResponse>
}

export interface SchemaValidate {
  validate(input: any): Promise<Error | void>
}
