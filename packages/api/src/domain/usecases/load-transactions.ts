import { Transaction } from '@/domain/entitities/transaction'

export type LoadTransactionsInput = {
  accountId: number
  date: Date
  page: number
  transactionType: 'cashIn' | 'cashOut' | 'all'
}

export type LoadTransactionsOutput = {
  transactions: Transaction[]
  totalTransactions: number
}

export interface LoadTransactions {
  execute(input: LoadTransactionsInput): Promise<LoadTransactionsOutput>
}
