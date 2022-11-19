import { HttpResponse } from '@/presentation/contracts'
import {
  conflict,
  forbidden,
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
    case 'UserNotFoundError':
      return notFound(error)
    case 'UserNotAuthorizedError':
      return forbidden(error)
    default:
      return internalServerError()
  }
}
