import { set } from 'date-fns'

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
    const [startDate, endDate] = this.getStartDateAndEndDate(date)
    const transactionProperties = this.getTransactionProperties(
      transactionType,
      startDate,
      endDate,
      accountId,
      skip,
      take
    )
    transactions = await this.transactionRepository.findAll(
      transactionProperties
    )
    totalTransactions = await this.transactionRepository.count(
      transactionProperties
    )
    return {
      transactions,
      totalTransactions
    }
  }

  private getStartDateAndEndDate(date?: Date): [Date?, Date?] {
    let startDate: Date | undefined
    let endDate: Date | undefined
    if (date) {
      const brTime = new Date(Number(date))
      startDate = set(brTime, {
        hours: 0,
        minutes: 0,
        seconds: 0
      })
      endDate = set(brTime, {
        hours: 23,
        minutes: 59,
        seconds: 59
      })
    }
    return [startDate, endDate]
  }

  private getTransactionProperties(
    transactionType: 'all' | 'cashIn' | 'cashOut',
    startDate: Date | undefined,
    endDate: Date | undefined,
    accountId: number,
    skip: number,
    take: number
  ): any {
    if (transactionType.toLowerCase() === 'all') {
      return {
        startDate,
        endDate,
        debitedAccountId: accountId,
        creditedAccountId: accountId,
        skip,
        take
      }
    }
    if (transactionType.toLowerCase() === 'cashin') {
      return {
        startDate,
        endDate,
        creditedAccountId: accountId,
        skip,
        take
      }
    }
    if (transactionType.toLowerCase() === 'cashout') {
      return {
        startDate,
        endDate,
        debitedAccountId: accountId,
        skip,
        take
      }
    }
  }
}
