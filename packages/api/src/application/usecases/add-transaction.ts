import { UserRepository } from '@/domain/repositories/user-repository'
import {
  AddTransaction,
  AddTransactionInput,
  AddTransactionOutput
} from '@/domain/usecases/add-transaction'
import {
  BalanceIsNotEnoughError,
  UserNotAuthorizedError,
  UserNotFoundError
} from '@/application/errors'
import { TransactionRepository } from '@/domain/repositories/transaction-repository'
import { AccountRepository } from '@/domain/repositories/account-repository'
import { DbAdapter } from '@/application/contracts'

export class AddTransactionUseCase implements AddTransaction {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly accountRepository: AccountRepository,
    private readonly transactionRepositoy: TransactionRepository,
    private readonly dbAdapter: DbAdapter
  ) {}

  async execute(input: AddTransactionInput): Promise<AddTransactionOutput> {
    const { authAccountId, usernameToCashIn, amount } = input
    const userToCashIn = await this.userRepository.findUserByUsername(
      usernameToCashIn
    )
    if (!userToCashIn) throw new UserNotFoundError()
    const userToCashOut = await this.userRepository.findUserById(authAccountId)
    if (!userToCashOut) throw new UserNotFoundError()
    if (userToCashOut?.username === usernameToCashIn) {
      throw new UserNotAuthorizedError()
    }
    if (userToCashOut?.account.balance.lt(input.amount)) {
      throw new BalanceIsNotEnoughError()
    }
    this.dbAdapter.initiateDbTransaction([
      this.accountRepository.decrementBalance(userToCashOut.id, amount),
      this.accountRepository.incrementBalance(userToCashIn.id, amount),
      this.transactionRepositoy.save(userToCashOut.id, userToCashOut.id, amount)
    ])
    return {
      from: userToCashOut.username,
      to: userToCashIn.username,
      amountTransacted: input.amount
    }
  }
}
