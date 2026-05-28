import heroImage from '../assets/hero.png'

function Navbar() {
  return (
    <nav style={{
      background: 'linear-gradient(180deg, #1a1a1a 0%, #111 100%)',
      height: '56px',
      borderBottom: '2px solid #3a3a3a',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(74,222,128,0.05) 0%, transparent 40%)', pointerEvents: 'none' }} />

      <div style={{ height: '100%', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

        {/* Logo com imagem pequena */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <img
            src={heroImage}
            alt="MinePack"
            style={{ width: '36px', height: '36px', objectFit: 'contain', imageRendering: 'pixelated', flexShrink: 0 }}
          />
          <div>
            <div style={{ fontFamily: 'var(--font-pixel)', fontSize: '0.65rem', color: '#4ade80', letterSpacing: '0.05em', textShadow: '0 0 10px rgba(74,222,128,0.4)', lineHeight: 1 }}>
              MinePack
            </div>
            <div style={{ fontFamily: 'var(--font-pixel)', fontSize: '0.32rem', color: '#4b5563', letterSpacing: '0.1em', marginTop: '4px' }}>
              OPTIMIZER v1.0
            </div>
          </div>
        </div>

        {/* Nav */}
        <div style={{ display: 'flex', gap: '4px' }}>
          {[['DASHBOARD', true], ['HISTÓRICO', false], ['CONFIG', false]].map(([label, active]) => (
            <button key={label} style={{
              fontFamily: 'var(--font-ui)', fontSize: '0.75rem', fontWeight: 700,
              letterSpacing: '0.1em', padding: '0 14px', height: '56px',
              color: active ? '#4ade80' : '#6b7280',
              background: 'none', border: 'none',
              borderBottom: active ? '2px solid #4ade80' : '2px solid transparent',
              cursor: 'pointer',
            }}>
              {label}
            </button>
          ))}
        </div>

        {/* Status */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '5px 12px', borderRadius: '4px', background: 'rgba(74,222,128,0.08)', border: '1px solid rgba(74,222,128,0.2)' }}>
          <span className="animate-pulse-green" style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#4ade80', display: 'inline-block' }} />
          <span style={{ fontFamily: 'var(--font-ui)', fontSize: '0.7rem', fontWeight: 600, color: '#9ca3af', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>
            SISTEMA ONLINE
          </span>
        </div>
      </div>
    </nav>
  )
}

export default Navbar