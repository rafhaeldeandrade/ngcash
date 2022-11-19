export type HttpRequest = {
  body?: any
  user?: {
    id: number
    accountId: number
  }
  headers?: any
  params?: any
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

export interface Middleware {
  handle(httpRequest: HttpRequest): Promise<HttpResponse>
}
