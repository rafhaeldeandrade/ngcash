import { NextFunction, Request, Response } from 'express'
import { Middleware } from '@/presentation/contracts'

export function expressMiddlewareAdapter(middleware: Middleware) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const httpRequest = {
      headers: req.headers,
      body: req.body,
      query: req.query
    }
    const httpResponse = await middleware.handle(httpRequest)
    if (httpResponse.statusCode !== 200 && httpResponse.statusCode !== 201) {
      return res.status(httpResponse.statusCode).json(httpResponse.body)
    }
    req.body = httpResponse.body
    next()
  }
}
