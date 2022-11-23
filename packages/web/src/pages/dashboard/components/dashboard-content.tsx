import React, { useState } from 'react'
import { Pagination } from '../../../components/pagination/pagination'
import { DashboardContentContainer, DashboardCards } from '../styles'
import { SendMoneyCard } from './send-money-container'
import { TransactionsCard } from './transactions-card'

export function DashboardContent() {
  const [page, setPage] = useState(1)
  const [maxPages, setMaxPages] = useState<number>(null as any)
  const [filterType, setFilterType] = useState<'all' | 'cashIn' | 'cashOut'>(
    'all'
  )

  return (
    <DashboardContentContainer>
      <DashboardCards>
        <TransactionsCard
          type={filterType}
          setType={setFilterType}
          page={page}
          setPage={setPage}
          setMaxPages={setMaxPages}
        />
        <SendMoneyCard />
      </DashboardCards>
      <Pagination
        setCurrentPage={setPage}
        currentPage={maxPages ? page : 0}
        maxPages={maxPages}
      />
    </DashboardContentContainer>
  )
}
