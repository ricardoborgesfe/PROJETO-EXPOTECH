import { useEffect, useState } from 'react'

// Each truck: { id, name, itemCount, totalWeight, efficiency, departedAt }
function TruckFleet({ trucks }) {
  const [now, setNow] = useState(Date.now())

  useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(interval)
  }, [])

  if (trucks.length === 0) return null

  return (
    <div style={{ background: 'rgba(18,18,18,0.95)', border: '1px solid #2a2a2a', borderRadius: '8px', overflow: 'hidden' }}>
      <div style={{ padding: '8px 12px', borderBottom: '1px solid #2a2a2a' }}>
        <span style={{ fontFamily: 'var(--font-pixel)', fontSize: '0.4rem', color: '#9ca3af', letterSpacing: '0.1em' }}>
          🚚 FROTA EM ROTA
        </span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', maxHeight: '220px', overflowY: 'auto' }}
        className="scrollbar-thin">
        {trucks.map((t) => {
          const elapsed = Math.floor((now - t.departedAt) / 1000)
          const remaining = Math.max(0, 120 - elapsed) // 2 min
          const mins = Math.floor(remaining / 60)
          const secs = String(remaining % 60).padStart(2, '0')
          const progress = Math.min(100, (elapsed / 120) * 100)

          return (
            <div key={t.id} style={{ padding: '8px 12px', borderBottom: '1px solid #1a1a1a', background: '#0f0f0f' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span style={{ fontFamily: 'var(--font-pixel)', fontSize: '0.38rem', color: '#e5e5e5', letterSpacing: '0.05em' }}>
                  🚚 {t.name}
                </span>
                <span style={{ fontFamily: 'var(--font-ui)', fontSize: '0.65rem', color: '#fbbf24', fontWeight: 700 }}>
                  {mins}:{secs}
                </span>
              </div>

              {/* Progress bar */}
              <div style={{ width: '100%', height: '4px', background: '#2a2a2a', borderRadius: '2px', overflow: 'hidden', marginBottom: '4px' }}>
                <div style={{ height: '100%', width: `${progress}%`, background: 'linear-gradient(90deg, #fbbf24, #f59e0b)', transition: 'width 1s linear', borderRadius: '2px' }} />
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                <span style={{ fontFamily: 'var(--font-ui)', fontSize: '0.62rem', color: '#9ca3af' }}>
                  📦 {t.itemCount} itens
                </span>
                <span style={{ fontFamily: 'var(--font-ui)', fontSize: '0.62rem', color: '#9ca3af' }}>
                  ⚖ {t.totalWeight}kg
                </span>
                <span style={{ fontFamily: 'var(--font-ui)', fontSize: '0.62rem', color: '#4ade80', fontWeight: 700 }}>
                  {t.efficiency}% ef.
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default TruckFleet