import { AccountRepository } from '@/domain/repositories/account-repository'
import {
  LoadUserAccountBalance,
  LoadUserAccountBalanceInput,
  LoadUserAccountBalanceOutput
} from '@/domain/usecases/load-user-account-balance'
import { AccountNotFoundError } from '@/application/errors'

export class LoadUserAccountBalanceUseCase implements LoadUserAccountBalance {
  constructor(private readonly accountRepository: AccountRepository) {}

  async execute(
    input: LoadUserAccountBalanceInput
  ): Promise<LoadUserAccountBalanceOutput> {
    const balance = await this.accountRepository.getBalance(input)
    if (!balance) throw new AccountNotFoundError(input)
    return {
      balance
    }
  }
}
