import { Router } from 'express'
import { expressRouteAdapter } from '@/main/adapters/express-route-adapter'
import { makeAddTransactionController } from '@/main/factories/make-add-transaction'
import { expressMiddlewareAdapter } from '@/main/adapters/express-middleware-adapter'
import { makeAuthenticationMiddleware } from '@/main/factories/make-authentication-middleware'
import { makeLoadTransactionsController } from '@/main/factories/make-load-transactions'

export default function (router: Router): void {
  router.post(
    '/transactions',
    [expressMiddlewareAdapter(makeAuthenticationMiddleware())],
    expressRouteAdapter(makeAddTransactionController())
  )
  router.get(
    '/transactions',
    [expressMiddlewareAdapter(makeAuthenticationMiddleware())],
    expressRouteAdapter(makeLoadTransactionsController())
  )
}
