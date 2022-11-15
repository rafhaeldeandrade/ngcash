import { HttpResponse } from '@/presentation/contracts'
import {
  conflict,
  internalServerError
} from '@/presentation/helpers/http-helper'

export const errorAdapter = (error: Error): HttpResponse => {
  switch (error.name) {
    case 'UserAlreadyExistsError':
      return conflict(error)
    default:
      return internalServerError()
  }
}