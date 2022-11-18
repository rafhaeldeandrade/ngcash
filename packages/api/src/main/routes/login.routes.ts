import { Router } from 'express'
import { expressRouteAdapter } from '@/main/adapters/express-route-adapter'
import { makeLoginController } from '@/main/factories/make-login'

export default function (router: Router): void {
  router.post('/login', expressRouteAdapter(makeLoginController()))
}
