import { useNavigate, Link } from 'react-router-dom'
import { clearSession, getUser } from '../utils/auth'
import { LogOut, Globe } from 'lucide-react'

const Navbar = () => {
  const navigate = useNavigate()
  const user = getUser()

  const handleLogout = () => {
    clearSession()
    navigate('/login')
  }

  return (
    <nav style={{ 
      background: 'var(--bg-card)', 
      padding: '1rem 2rem', 
      display: 'flex', 
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottom: '1px solid #334155'
    }}>
      <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', color: 'white' }}>
        <Globe size={24} color="var(--accent-primary)" />
        <span style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Cosmic Watch</span>
      </Link>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        <span style={{ color: 'var(--text-secondary)' }}>Welcome, {user?.name}</span>
        <button onClick={handleLogout} className="btn" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', background: 'transparent' }}>
          <LogOut size={18} /> Logout
        </button>
      </div>
    </nav>
  )
}

export default Navbar