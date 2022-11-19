import { LoadUserAccountBalance } from '@/domain/usecases/load-user-account-balance'
import {
  Controller,
  HttpRequest,
  HttpResponse,
  SchemaValidate
} from '@/presentation/contracts'
import { badRequest, ok } from '@/presentation/helpers/http-helper'
import { errorAdapter } from '@/presentation/helpers/error-adapter'

export class LoadUserAccountBalanceController implements Controller {
  constructor(
    private readonly schemaValidate: SchemaValidate,
    private readonly loadUserAccountBalanceUseCase: LoadUserAccountBalance
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = await this.schemaValidate.validate({
        queryAccountId: Number(httpRequest.query?.accountId),
        authAccountId: Number(httpRequest.body?.user?.accountId)
      })
      if (error) return badRequest(error)
      const balance = await this.loadUserAccountBalanceUseCase.execute({
        queryAccountId: Number(httpRequest.query?.accountId),
        authAccountId: Number(httpRequest.body?.user?.accountId)
      })
      return ok(balance)
    } catch (e) {
      return errorAdapter(e as Error)
    }
  }
}
