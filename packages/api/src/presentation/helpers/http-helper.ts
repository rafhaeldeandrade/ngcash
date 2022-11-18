import { HttpResponse } from '@/presentation/contracts'

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: {
    message: error.message
  }
})

export const internalServerError = (): HttpResponse => ({
  statusCode: 500,
  body: {
    message: 'Internal server error'
  }
})

export const conflict = (error: Error): HttpResponse => ({
  statusCode: 409,
  body: {
    message: error.message
  }
})

export const ok = (data: any): HttpResponse => ({
  statusCode: 200,
  body: data
})

export const created = (data: any): HttpResponse => ({
  statusCode: 201,
  body: data
})

export const unauthorized = () => ({
  statusCode: 401,
  body: {
    message: 'Wrong credentials'
  }
})

export const notFound = (error: Error): HttpResponse => ({
  statusCode: 404,
  body: {
    message: error.message
  }
})
