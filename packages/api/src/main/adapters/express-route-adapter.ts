import { Controller } from '@/presentation/contracts'
import { Request, Response } from 'express'

export function expressRouteAdapter(controller: Controller) {
  return async (req: Request, res: Response) => {
    const httpRequest = {
      body: req.body,
      params: req.params,
      query: req.query
    }
    const httpResponse = await controller.handle(httpRequest)
    return res.status(httpResponse.statusCode).json(httpResponse.body)
  }
}
