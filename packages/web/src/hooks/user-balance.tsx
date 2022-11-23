import { useState, useEffect } from 'react'

import { getCurrentBalance } from '../services/bank.api'

interface UseBalanceReturn {
  balance: string
  isLoading: boolean
}

export function useUserBalance(): UseBalanceReturn {
  const [balance, setBalance] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    async function fetchBalance() {
      const response = await getCurrentBalance()
      if (response?.statusCode === 200) {
        setBalance(
          parseFloat(
            (Math.floor(response.balance * 100) / 100).toString()
          ).toFixed(2)
        )
      }
    }
    setIsLoading(true)
    fetchBalance()
    setIsLoading(false)
  }, [])

  return {
    balance,
    isLoading
  }
}
