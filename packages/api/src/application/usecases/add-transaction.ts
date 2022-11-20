import { UserRepository } from '@/domain/repositories/user-repository'
import {
  AddTransaction,
  AddTransactionInput,
  AddTransactionOutput
} from '@/domain/usecases/add-transaction'
import { Prisma } from '@prisma/client'

export class AddTransactionUseCase implements AddTransaction {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(input: AddTransactionInput): Promise<AddTransactionOutput> {
    const { authAccountId } = input
    await this.userRepository.findUserById(authAccountId)
    return {
      from: 'any',
      to: 'any',
      amountTransacted: new Prisma.Decimal(0)
    }
  }
}
