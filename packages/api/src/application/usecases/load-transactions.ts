import { Transaction } from '@/domain/entitities/transaction'
import { TransactionRepository } from '@/domain/repositories/transaction-repository'
import {
  LoadTransactions,
  LoadTransactionsInput,
  LoadTransactionsOutput
} from '@/domain/usecases/load-transactions'

export class LoadTransactionsUseCase implements LoadTransactions {
  constructor(private readonly transactionRepository: TransactionRepository) {}

  async execute(input: LoadTransactionsInput): Promise<LoadTransactionsOutput> {
    const { transactionType, accountId, page, date } = input
    let transactions: Transaction[] = []
    const skip = page - 1 * 20
    const take = 20
    if (transactionType.toLowerCase() === 'all') {
      transactions = await this.transactionRepository.findAll({
        createdAt: date,
        debitedAccountId: accountId,
        creditedAccountId: accountId,
        skip,
        take
      })
    }
    if (transactionType.toLowerCase() === 'cashin') {
      transactions = await this.transactionRepository.findAll({
        createdAt: date,
        debitedAccountId: accountId,
        skip,
        take
      })
    }
    return {
      transactions,
      totalTransactions: 0
    }
  }
}
