import React, { useEffect } from 'react'
import { useUserAccountTransactions } from '../../../hooks/user-transactions'
import {
  FilterContainer,
  FilterItem,
  TransactionsCardContainer,
  TransactionsCardHeader,
  TransactionsTable,
  TransactionsTableHeader,
  TransactionsTableHeaderItem,
  TransactionsTableRow,
  TransactionsTableRowItem
} from '../styles'

interface TransactionsCardProps {
  type: 'all' | 'cashIn' | 'cashOut'
  page: number
  setMaxPages: (value: number) => void
}

export function TransactionsCard({
  type,
  page,
  setMaxPages
}: TransactionsCardProps) {
  const { transactions, isLoading, totalTransactions } =
    useUserAccountTransactions(page, type)

  function transactionsItems() {
    return transactions.map((transaction) => {
      const { id, amount, createdAt, debitedAccount, creditedAccount } =
        transaction
      const debitedAccountUsername = '@' + debitedAccount.user?.username
      const creditedAccountUsername = '@' + creditedAccount.user?.username
      const amountValue =
        'R$' + (Math.floor(Number(amount) * 100) / 100).toFixed(2)
      const date = new Date(createdAt).toLocaleDateString('pt-BR')

      return (
        <TransactionsTableRow key={id as any}>
          <TransactionsTableRowItem>
            {debitedAccountUsername}
          </TransactionsTableRowItem>
          <TransactionsTableRowItem>
            {creditedAccountUsername}
          </TransactionsTableRowItem>
          <TransactionsTableRowItem>{amountValue}</TransactionsTableRowItem>
          <TransactionsTableRowItem>{date}</TransactionsTableRowItem>
        </TransactionsTableRow>
      )
    })
  }

  useEffect(() => {
    setMaxPages(Math.ceil(totalTransactions / 10))
  }, [setMaxPages, totalTransactions])

  return (
    <TransactionsCardContainer>
      <TransactionsCardHeader>
        <h1>Transactions</h1>
        <FilterContainer>
          <span>Filtrar por: </span>
          <FilterItem>Cash in</FilterItem>
          <FilterItem>Cash out</FilterItem>
          <FilterItem>Data</FilterItem>
        </FilterContainer>
      </TransactionsCardHeader>
      <TransactionsTable>
        <TransactionsTableHeader>
          <TransactionsTableHeaderItem>From</TransactionsTableHeaderItem>
          <TransactionsTableHeaderItem>To</TransactionsTableHeaderItem>
          <TransactionsTableHeaderItem>Amount</TransactionsTableHeaderItem>
          <TransactionsTableHeaderItem>Date</TransactionsTableHeaderItem>
        </TransactionsTableHeader>
        {isLoading ? 'Loading...' : transactionsItems()}
      </TransactionsTable>
    </TransactionsCardContainer>
  )
}
