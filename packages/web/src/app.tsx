import React from 'react'
import { BrowserRouter } from 'react-router-dom'

import { UserContextProvider } from './contexts/user'
import { AuthProvider } from './hooks/auth'
import { AppRoutes } from './routes'
import { GlobalStyle } from './styles/global'

export function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <UserContextProvider>
          <GlobalStyle />
          <AppRoutes />
        </UserContextProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}
