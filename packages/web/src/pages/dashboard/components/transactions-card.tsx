import React, { useEffect } from 'react'
import DatePicker from 'react-date-picker'

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
  setType: (type: 'all' | 'cashIn' | 'cashOut') => void
  page: number
  setPage: (value: number) => void
  setMaxPages: (value: number) => void
}

export function TransactionsCard({
  type,
  setType,
  page,
  setPage,
  setMaxPages
}: TransactionsCardProps) {
  const [startDate, setStartDate] = React.useState(new Date())
  const { transactions, isLoading, totalTransactions } =
    useUserAccountTransactions(page, type, startDate)

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

  function handleFilterType(e: any) {
    if (e.target.id === 'all') setType('all')
    if (e.target.id === 'cashIn') setType('cashIn')
    if (e.target.id === 'cashOut') setType('cashOut')
  }

  function handleDate(date: Date) {
    setPage(1)
    setStartDate(date)
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
          <FilterItem id="all" onClick={handleFilterType}>
            All
          </FilterItem>
          <FilterItem id="cashIn" onClick={handleFilterType}>
            Cash in
          </FilterItem>
          <FilterItem id="cashOut" onClick={handleFilterType}>
            Cash out
          </FilterItem>
          <DatePicker onChange={handleDate} value={startDate} />
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
