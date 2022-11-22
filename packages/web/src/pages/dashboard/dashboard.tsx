import React from 'react'
import { Header } from '../../components/header/header'
import { useUserBalance } from '../../hooks/user-balance'
import { DashboardContent } from './components/dashboard-content'
import { Balance, DashboardContainer, DashboardHeader } from './styles'

export function Dashboard() {
  const { balance, isLoading } = useUserBalance()

  return (
    <>
      <Header />
      <DashboardContainer>
        <DashboardHeader>
          <Balance>Current balance: </Balance>
          {isLoading ? 'Carregando...' : <Balance>R$ {balance}</Balance>}
        </DashboardHeader>
        <DashboardContent />
      </DashboardContainer>
    </>
  )
}
