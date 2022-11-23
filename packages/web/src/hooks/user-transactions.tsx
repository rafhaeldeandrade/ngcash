import { useEffect, useState } from 'react'
import { getTransactions } from '../services/bank.api'

interface TransactionAccount {
  id: number
  user?: {
    id: number
    username: string
  }
}

interface Transaction {
  id: number
  amount: string
  createdAt: Date
  debitedAccount: TransactionAccount
  creditedAccount: TransactionAccount
}

export function useUserAccountTransactions(
  page?: number,
  type?: 'cashIn' | 'cashOut' | 'all',
  date?: Date
) {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [totalTransactions, setTotalTransactions] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string>(null as any)

  useEffect(() => {
    async function fetchTransactions() {
      const response = await getTransactions({
        page,
        type,
        date
      })
      if (response?.statusCode === 200) {
        setTransactions(response.transactions)
        setTotalTransactions(response.totalTransactions)
      } else {
        setError('Error fetching transactions, try again later')
      }
    }
    setIsLoading(true)
    fetchTransactions()
    setIsLoading(false)
  }, [page, type, date])

  return {
    transactions,
    isLoading,
    error,
    totalTransactions
  }
}
