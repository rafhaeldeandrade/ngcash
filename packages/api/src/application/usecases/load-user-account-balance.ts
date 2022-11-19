import { AccountRepository } from '@/domain/repositories/account-repository'
import {
  LoadUserAccountBalance,
  LoadUserAccountBalanceInput,
  LoadUserAccountBalanceOutput
} from '@/domain/usecases/load-user-account-balance'
import { UserNotAuthorizedError } from '@/application/errors'

export class LoadUserAccountBalanceUseCase implements LoadUserAccountBalance {
  constructor(private readonly accountRepository: AccountRepository) {}

  async execute(
    input: LoadUserAccountBalanceInput
  ): Promise<LoadUserAccountBalanceOutput> {
    const { queryAccountId, authAccountId } = input
    if (queryAccountId !== authAccountId) throw new UserNotAuthorizedError()
    const account = await this.accountRepository.getBalance(queryAccountId)
    if (!account?.balance) throw new UserNotAuthorizedError()
    return {
      balance: account.balance.toNumber()
    }
  }
}
