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
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(74,222,128,0.06) 0%, transparent 50%)', pointerEvents: 'none' }} />
      <div style={{ height: '100%', padding: '0 24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
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
    </nav>
  )
}

export default Navbar