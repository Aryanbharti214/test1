const RiskBadge = ({ level }) => {
  const colors = {
    Low: 'var(--accent-success)',
    Moderate: 'var(--accent-warning)',
    High: 'var(--accent-danger)',
    Extreme: '#991b1b'
  }

  return (
    <span style={{
      backgroundColor: `${colors[level]}20`, // 20% opacity
      color: colors[level],
      padding: '0.25rem 0.75rem',
      borderRadius: '9999px',
      fontSize: '0.875rem',
      fontWeight: '600',
      border: `1px solid ${colors[level]}`
    }}>
      {level}
    </span>
  )
}

export default RiskBadge