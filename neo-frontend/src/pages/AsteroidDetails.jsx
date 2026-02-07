import { useEffect, useState, useRef } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import { io } from 'socket.io-client'
import { getUser } from '../utils/auth'
import { addToWatchlist } from '../api/asteroid.service'

const AsteroidDetails = () => {
  const { id } = useParams()
  const { state } = useLocation() // Passed from table
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const socketRef = useRef()
  const user = getUser()

  const neo = state?.neo || { name: 'Unknown Object', riskLevel: 'Unknown' } // Fallback

  useEffect(() => {
    // Connect to Socket
    socketRef.current = io('http://localhost:3000')

    // Join Room
    socketRef.current.emit('join_room', id)

    // Listen
    socketRef.current.on('receive_message', (data) => {
      setMessages((prev) => [...prev, data])
    })

    return () => socketRef.current.disconnect()
  }, [id])

  const sendMessage = () => {
    if (!input.trim()) return
    const msgData = {
      asteroidId: id,
      userId: user.id,
      userName: user.name,
      message: input,
      time: new Date().toLocaleTimeString()
    }
    
    // Optimistic Update
    setMessages((prev) => [...prev, msgData])
    socketRef.current.emit('send_message', msgData)
    setInput('')
  }

  const handleSave = async () => {
    try {
      await addToWatchlist(id)
      alert('Added to watchlist!')
    } catch(err) {
      alert('Error adding to watchlist')
    }
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
      {/* Left: Details */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1>{neo.name}</h1>
          <button className="btn btn-primary" onClick={handleSave}>+ Watchlist</button>
        </div>
        
        <div style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: '0.5rem', marginTop: '1rem' }}>
          <h2>Analysis Data</h2>
          <p>Risk Level: <strong>{neo.riskLevel}</strong></p>
          <p>Hazardous: {neo.hazardous ? 'YES' : 'No'}</p>
          {/* Add Unit Converter here later */}
        </div>
      </div>

      {/* Right: Live Chat */}
      <div style={{ background: 'var(--bg-card)', borderRadius: '0.5rem', height: '600px', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '1rem', borderBottom: '1px solid #334' }}>
          <h3>Live Tracking Chat</h3>
        </div>
        
        <div style={{ flex: 1, padding: '1rem', overflowY: 'auto' }}>
          {messages.map((msg, i) => (
            <div key={i} style={{ marginBottom: '1rem', textAlign: msg.userId === user.id ? 'right' : 'left' }}>
              <small style={{ color: 'var(--text-secondary)' }}>{msg.userName} • {msg.time}</small>
              <div style={{ 
                background: msg.userId === user.id ? 'var(--accent-primary)' : '#334155',
                padding: '0.5rem 1rem', 
                borderRadius: '1rem',
                display: 'inline-block',
                marginTop: '0.25rem'
              }}>
                {msg.message}
              </div>
            </div>
          ))}
        </div>

        <div style={{ padding: '1rem', display: 'flex', gap: '0.5rem' }}>
          <input 
            type="text" 
            value={input} 
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            style={{ flex: 1, padding: '0.5rem', borderRadius: '0.25rem', border: 'none' }}
            placeholder="Type update..."
          />
          <button className="btn btn-primary" onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  )
}

export default AsteroidDetails