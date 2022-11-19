import { Router } from 'express'
import { expressRouteAdapter } from '@/main/adapters/express-route-adapter'
import { makeLoadUserAccountBalanceController } from '@/main/factories/make-load-user-account-balance'
import { expressMiddlewareAdapter } from '@/main/adapters/express-middleware-adapter'
import { makeAuthenticationMiddleware } from '@/main/factories/make-authentication-middleware'

export default function (router: Router): void {
  router.get(
    '/accounts/:accountId',
    [expressMiddlewareAdapter(makeAuthenticationMiddleware())],
    expressRouteAdapter(makeLoadUserAccountBalanceController())
  )
}
