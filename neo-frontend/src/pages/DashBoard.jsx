import { useEffect, useState } from 'react'
import { getNeoFeed } from '../api/asteroid.service'
import AsteroidTable from '../components/AsteroidTable'
import StatCard from '../components/StatCard' // Assuming basic card component
import Loader from '../components/Loader' // Assuming basic loader
import { AlertTriangle, Rocket } from 'lucide-react'

const Dashboard = () => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const feed = await getNeoFeed()
        setData(feed)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  if (loading) return <Loader />

  const hazardousCount = data?.asteroids.filter(a => a.hazardous).length

  return (
    <div>
      <h1 style={{ marginBottom: '2rem' }}>Live Asteroid Feed</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        <div style={{ background: 'var(--bg-card)', padding: '1.5rem', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Rocket size={32} color="var(--accent-primary)" />
          <div>
            <h3>Total Near</h3>
            <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{data?.count}</p>
          </div>
        </div>

        <div style={{ background: 'var(--bg-card)', padding: '1.5rem', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <AlertTriangle size={32} color="var(--accent-danger)" />
          <div>
            <h3>Hazardous</h3>
            <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{hazardousCount}</p>
          </div>
        </div>
      </div>

      <AsteroidTable asteroids={data?.asteroids || []} />
    </div>
  )
}

export default Dashboard