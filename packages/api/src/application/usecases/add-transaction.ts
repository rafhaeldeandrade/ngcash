import { UserRepository } from '@/domain/repositories/user-repository'
import {
  AddTransaction,
  AddTransactionInput,
  AddTransactionOutput
} from '@/domain/usecases/add-transaction'
import { Prisma } from '@prisma/client'
import { UserNotAuthorizedError, UserNotFoundError } from '../errors'

export class AddTransactionUseCase implements AddTransaction {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(input: AddTransactionInput): Promise<AddTransactionOutput> {
    const { authAccountId, usernameToCashIn } = input
    const userToCashIn = await this.userRepository.findUserByUsername(
      usernameToCashIn
    )
    if (!userToCashIn) throw new UserNotFoundError()
    const user = await this.userRepository.findUserById(authAccountId)
    if (user?.username === usernameToCashIn) {
      throw new UserNotAuthorizedError()
    }
    return {
      from: 'any',
      to: 'any',
      amountTransacted: new Prisma.Decimal(0)
    }
  }
}
