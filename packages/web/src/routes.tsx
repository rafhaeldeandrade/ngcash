import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import { Home } from './pages/home/home'

export function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  )
}
