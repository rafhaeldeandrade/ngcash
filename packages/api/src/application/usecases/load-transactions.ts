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
    let totalTransactions = 0
    const skip = (page - 1) * 10
    const take = 10
    if (transactionType.toLowerCase() === 'all') {
      transactions = await this.transactionRepository.findAll({
        createdAt: date,
        debitedAccountId: accountId,
        creditedAccountId: accountId,
        skip,
        take
      })
      totalTransactions = await this.transactionRepository.count({
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
        creditedAccountId: accountId,
        skip,
        take
      })
      totalTransactions = await this.transactionRepository.count({
        createdAt: date,
        creditedAccountId: accountId,
        skip,
        take
      })
    }
    if (transactionType.toLowerCase() === 'cashout') {
      transactions = await this.transactionRepository.findAll({
        createdAt: date,
        debitedAccountId: accountId,
        skip,
        take
      })
      totalTransactions = await this.transactionRepository.count({
        createdAt: date,
        debitedAccountId: accountId,
        skip,
        take
      })
    }
    return {
      transactions,
      totalTransactions
    }
  }
}
