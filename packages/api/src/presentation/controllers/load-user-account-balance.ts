import { LoadUserAccountBalance } from '@/domain/usecases/load-user-account-balance'
import {
  Controller,
  HttpRequest,
  HttpResponse,
  SchemaValidate
} from '@/presentation/contracts'
import { badRequest } from '@/presentation/helpers/http-helper'
import { errorAdapter } from '@/presentation/helpers/error-adapter'

export class LoadUserAccountBalanceController implements Controller {
  constructor(
    private readonly schemaValidate: SchemaValidate,
    private readonly loadUserAccountBalanceUseCase: LoadUserAccountBalance
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = await this.schemaValidate.validate(httpRequest.user)
      if (error) return badRequest(error)
      await this.loadUserAccountBalanceUseCase.execute(
        httpRequest.user?.accountId as number
      )
      return Promise.resolve({
        statusCode: 200,
        body: {
          balance: 0
        }
      })
    } catch (e) {
      return errorAdapter(e as Error)
    }
  }
}
