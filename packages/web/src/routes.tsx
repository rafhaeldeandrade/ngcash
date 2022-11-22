import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { useAuth } from './hooks/auth'

import { Dashboard } from './pages/dashboard/dashboard'
import { Home } from './pages/home/home'
import { Login } from './pages/login/login'
import { SignUp } from './pages/signup/signup'

export function AppRoutes() {
  const { authed } = useAuth()
  console.log(authed)
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/dashboard"
        element={authed ? <Dashboard /> : <Navigate to="/login" />}
      />
    </Routes>
  )
}
