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
