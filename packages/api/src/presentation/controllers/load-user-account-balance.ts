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
      const error = await this.schemaValidate.validate(
        httpRequest.body.user?.accountId
      )
      if (error) return badRequest(error)
      const balance = await this.loadUserAccountBalanceUseCase.execute(
        httpRequest.body.user?.accountId as number
      )
      return ok(balance)
    } catch (e) {
      console.log(e)
      return errorAdapter(e as Error)
    }
  }
}
