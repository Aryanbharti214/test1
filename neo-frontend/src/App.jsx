import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import AsteroidDetails from './pages/AsteroidDetails'
import DashboardLayout from './layouts/DashboardLayout'
import { isAuthenticated } from './utils/auth'

const ProtectedRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" />
}

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      
      <Route path="/" element={
        <ProtectedRoute>
          <DashboardLayout />
        </ProtectedRoute>
      }>
        <Route index element={<Dashboard />} />
        <Route path="asteroid/:id" element={<AsteroidDetails />} />
      </Route>
    </Routes>
  )
}

export default App