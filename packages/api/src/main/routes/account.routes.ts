import { Router } from 'express'
import { expressRouteAdapter } from '@/main/adapters/express-route-adapter'
import { makeLoadUserAccountBalanceController } from '@/main/factories/make-load-user-account-balance'

export default function (router: Router): void {
  router.get(
    '/accounts',
    expressRouteAdapter(makeLoadUserAccountBalanceController())
  )
}
