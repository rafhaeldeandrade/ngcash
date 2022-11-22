import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import { Home } from './pages/home/home'
import { SignUp } from './pages/signup/signup'

export function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  )
}
