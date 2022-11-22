import React from 'react'
import { Pagination } from '../../../components/pagination/pagination'
import { DashboardContentContainer, DashboardCards } from '../styles'
import { TransactionsCard } from './transactions-card'

export function DashboardContent() {
  const [page, setPage] = React.useState(1)
  const [maxPages, setMaxPages] = React.useState<number>(null as any)

  return (
    <DashboardContentContainer>
      <DashboardCards>
        <TransactionsCard type="all" page={page} setMaxPages={setMaxPages} />
      </DashboardCards>
      <Pagination
        setCurrentPage={setPage}
        currentPage={page}
        maxPages={maxPages}
      />
    </DashboardContentContainer>
  )
}
