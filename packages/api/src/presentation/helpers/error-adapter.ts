import { HttpResponse } from '@/presentation/contracts'
import {
  badRequest,
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
    case 'InvalidTokenError':
      return badRequest(error)
    case 'InvalidParamError':
      return badRequest(error)
    case 'BalanceIsNotEnoughError':
      return badRequest(error)
    default:
      return internalServerError()
  }
}
