import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Header } from '../../components/header/header'
import { useAuth } from '../../hooks/auth'
import { useUserBalance } from '../../hooks/user-balance'
import { DashboardContent } from './components/dashboard-content'
import { Balance, DashboardContainer, DashboardHeader } from './styles'

export function Dashboard() {
  const { balance, isLoading } = useUserBalance()
  const { authed } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!authed) navigate('/login')
  }, [authed, navigate])

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
