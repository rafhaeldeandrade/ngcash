import { Router } from 'express'
import { expressRouteAdapter } from '@/main/adapters/express-route-adapter'
import { makeAddTransactionController } from '@/main/factories/make-add-transaction'
import { expressMiddlewareAdapter } from '@/main/adapters/express-middleware-adapter'
import { makeAuthenticationMiddleware } from '@/main/factories/make-authentication-middleware'

export default function (router: Router): void {
  router.post(
    '/transactions',
    [expressMiddlewareAdapter(makeAuthenticationMiddleware())],
    expressRouteAdapter(makeAddTransactionController())
  )
}
