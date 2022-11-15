import { HttpResponse } from '@/presentation/contracts'

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: {
    message: error.message
  }
})
