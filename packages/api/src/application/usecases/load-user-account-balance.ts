import { AccountRepository } from '@/domain/repositories/account-repository'
import {
  LoadUserAccountBalance,
  LoadUserAccountBalanceInput,
  LoadUserAccountBalanceOutput
} from '@/domain/usecases/load-user-account-balance'

export class LoadUserAccountBalanceUseCase implements LoadUserAccountBalance {
  constructor(private readonly accountRepository: AccountRepository) {}

  async execute(
    input: LoadUserAccountBalanceInput
  ): Promise<LoadUserAccountBalanceOutput> {
    await this.accountRepository.getAccountById(input)
    return {
      balance: 0
    }
  }
}
