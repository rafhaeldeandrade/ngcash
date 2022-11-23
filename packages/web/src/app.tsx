import React from 'react'
import { BrowserRouter } from 'react-router-dom'

import { AuthProvider } from './hooks/auth'
import { AppRoutes } from './routes'
import { GlobalStyle } from './styles/global'

export function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <GlobalStyle />
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  )
}
