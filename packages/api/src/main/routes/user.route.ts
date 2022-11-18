import { Router } from 'express'
import { expressRouteAdapter } from '@/main/adapters/express-route-adapter'
import { makeSignUpUserController } from '@/main/factories/make-signup-user'

export default function (router: Router): void {
  router.post('/users', expressRouteAdapter(makeSignUpUserController()))
}
