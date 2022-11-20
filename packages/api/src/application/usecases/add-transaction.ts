import { UserRepository } from '@/domain/repositories/user-repository'
import {
  AddTransaction,
  AddTransactionInput,
  AddTransactionOutput
} from '@/domain/usecases/add-transaction'
import { Prisma } from '@prisma/client'
import {
  BalanceIsNotEnoughError,
  UserNotAuthorizedError,
  UserNotFoundError
} from '@/application/errors'

export class AddTransactionUseCase implements AddTransaction {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(input: AddTransactionInput): Promise<AddTransactionOutput> {
    const { authAccountId, usernameToCashIn } = input
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
    return {
      from: 'any',
      to: 'any',
      amountTransacted: new Prisma.Decimal(0)
    }
  }
}
