import { HttpResponse } from '@/presentation/contracts'
import {
  conflict,
  internalServerError,
  unauthorized
} from '@/presentation/helpers/http-helper'

export const errorAdapter = (error: Error): HttpResponse => {
  switch (error.name) {
    case 'UserAlreadyExistsError':
      return conflict(error)
    case 'WrongCredentialsError':
      return unauthorized()
    default:
      return internalServerError()
  }
}
