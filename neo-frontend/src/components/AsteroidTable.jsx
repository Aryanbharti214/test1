import { useNavigate } from 'react-router-dom'
import RiskBadge from './RiskBadge'
import { ArrowRight } from 'lucide-react'

const AsteroidTable = ({ asteroids }) => {
  const navigate = useNavigate()

  return (
    <div style={{ background: 'var(--bg-card)', borderRadius: '0.5rem', overflow: 'hidden' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
        <thead style={{ background: '#334155' }}>
          <tr>
            <th style={{ padding: '1rem' }}>Name</th>
            <th style={{ padding: '1rem' }}>Hazardous?</th>
            <th style={{ padding: '1rem' }}>Risk Score</th>
            <th style={{ padding: '1rem' }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {asteroids.map((neo) => (
            <tr key={neo.id} style={{ borderBottom: '1px solid #334155' }}>
              <td style={{ padding: '1rem' }}>{neo.name}</td>
              <td style={{ padding: '1rem' }}>
                {neo.hazardous ? 'Yes ⚠️' : 'No'}
              </td>
              <td style={{ padding: '1rem' }}>
                <RiskBadge level={neo.riskLevel} /> ({neo.riskScore})
              </td>
              <td style={{ padding: '1rem' }}>
                <button 
                  className="btn" 
                  onClick={() => navigate(`/asteroid/${neo.id}`, { state: { neo } })}
                  style={{ color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', gap: '5px' }}
                >
                  View <ArrowRight size={16}/>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default AsteroidTable