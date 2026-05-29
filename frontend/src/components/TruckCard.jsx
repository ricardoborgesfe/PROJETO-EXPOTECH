import truckImage from '../assets/truck.png'

function TruckCard({ truck, usedCapacity, efficiency, status }) {
  const pct = Math.min(efficiency, 100)
  const barColor = pct >= 80 ? '#4ade80' : pct >= 50 ? '#fbbf24' : '#f87171'

  const statusConfig = {
    'ESPERANDO':       { color: '#6b7280', bg: 'rgba(107,114,128,0.1)', border: 'rgba(107,114,128,0.3)', label: '⏳ ESPERANDO' },
    'PRONTO PARA IR':  { color: '#60a5fa', bg: 'rgba(96,165,250,0.1)',  border: 'rgba(96,165,250,0.3)',  label: '✅ PRONTO PARA IR' },
    'EM TRANSPORTE':   { color: '#fbbf24', bg: 'rgba(251,191,36,0.1)',  border: 'rgba(251,191,36,0.3)',  label: '🚚 EM TRANSPORTE' },
  }
  const sc = statusConfig[status] || statusConfig['ESPERANDO']

  return (
    <div style={{ background: 'rgba(18,18,18,0.95)', border: '1px solid #2a2a2a', borderRadius: '8px', overflow: 'hidden' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px', borderBottom: '1px solid #2a2a2a' }}>
        <span style={{ fontFamily: 'var(--font-pixel)', fontSize: '0.4rem', color: '#9ca3af', letterSpacing: '0.08em' }}>
          {truck.name.toUpperCase()}
        </span>
        <span style={{ fontFamily: 'var(--font-ui)', fontSize: '0.62rem', fontWeight: 700, padding: '2px 8px', borderRadius: '4px', background: sc.bg, border: `1px solid ${sc.border}`, color: sc.color, whiteSpace: 'nowrap' }}>
          {sc.label}
        </span>
      </div>

      <div style={{ padding: '12px', display: 'flex', alignItems: 'center', gap: '12px' }}>
        <img src={truckImage} alt="Truck"
          style={{ width: '74px', objectFit: 'contain', imageRendering: 'pixelated', flexShrink: 0,
            filter: status === 'ESPERANDO' ? 'grayscale(0.6) opacity(0.6)' : 'none',
            transition: 'filter 0.4s',
          }} />

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
            <span style={{ fontFamily: 'var(--font-ui)', fontSize: '0.65rem', color: '#9ca3af', fontWeight: 600 }}>CAPACIDADE</span>
            <span style={{ fontFamily: 'var(--font-ui)', fontSize: '0.7rem', color: '#e5e5e5', fontWeight: 700 }}>
              {usedCapacity}/{truck.capacity}kg
            </span>
          </div>
          <div style={{ width: '100%', height: '13px', borderRadius: '4px', background: '#1a1a1a', border: '1px solid #3a3a3a', overflow: 'hidden', position: 'relative' }}>
            <div style={{ height: '100%', width: `${pct}%`, background: `linear-gradient(90deg, ${barColor}88, ${barColor})`, boxShadow: `0 0 8px ${barColor}55`, borderRadius: '4px', transition: 'width 0.7s ease' }} />
            <span style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-pixel)', fontSize: '6px', color: '#fff', textShadow: '0 1px 2px #000' }}>
              {pct}%
            </span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5px', marginTop: '7px' }}>
            {[
              { label: 'EFICIÊNCIA', value: `${efficiency}%`, color: barColor },
              { label: 'CARGA', value: `${usedCapacity}kg`, color: '#e5e5e5' },
            ].map(({ label, value, color }) => (
              <div key={label} style={{ padding: '5px 8px', borderRadius: '4px', background: '#111', border: '1px solid #222', textAlign: 'center' }}>
                <div style={{ fontFamily: 'var(--font-ui)', fontSize: '0.56rem', color: '#6b7280', fontWeight: 700, letterSpacing: '0.05em' }}>{label}</div>
                <div style={{ fontFamily: 'var(--font-pixel)', fontSize: '0.52rem', color, marginTop: '3px' }}>{value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TruckCard