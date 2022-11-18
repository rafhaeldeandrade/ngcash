import { HttpResponse } from '@/presentation/contracts'
import {
  conflict,
  internalServerError,
  notFound,
  unauthorized
} from '@/presentation/helpers/http-helper'

export const errorAdapter = (error: Error): HttpResponse => {
  switch (error.name) {
    case 'UserAlreadyExistsError':
      return conflict(error)
    case 'WrongCredentialsError':
      return unauthorized()
    case 'AccountNotFoundError':
      return notFound(error)
    default:
      return internalServerError()
  }
}
