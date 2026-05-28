import chestBg from '../assets/chest-bg.png'
import slotTexture from '../assets/minecraft-slot.png'

function ChestGrid({ selectedProducts }) {
  const slots = Array(27).fill(null)
  selectedProducts.forEach((product, i) => { if (i < 27) slots[i] = product })

  return (
    <div style={{ border: '3px solid #4b4b4b', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 8px 32px rgba(0,0,0,0.6)' }}>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '7px 14px', background: 'rgba(10,10,10,0.95)', borderBottom: '2px solid #3a3a3a' }}>
        <span style={{ fontFamily: 'var(--font-pixel)', fontSize: '0.42rem', color: '#c4c4c4', letterSpacing: '0.1em' }}>
          BAÚ DO CAMINHÃO
        </span>
        <span style={{ fontFamily: 'var(--font-ui)', fontSize: '0.7rem', color: '#6b7280', fontWeight: 600 }}>
          {selectedProducts.length}/27 slots
        </span>
      </div>

      {/* Grid */}
      <div style={{ padding: '10px', backgroundImage: `url(${chestBg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(9, 1fr)', gap: '5px' }}>
          {slots.map((slot, index) => (
            <div
              key={index}
              title={slot ? `${slot.title} | Prioridade: ${slot.priority} | Peso: ${slot.weight}kg` : ''}
              style={{
                aspectRatio: '1 / 1',
                backgroundImage: `url(${slotTexture})`,
                backgroundSize: '100% 100%',
                imageRendering: 'pixelated',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                cursor: slot ? 'pointer' : 'default',
                transition: 'transform 0.15s ease',
                boxSizing: 'border-box',
              }}
              onMouseEnter={e => { if (slot) e.currentTarget.style.transform = 'scale(1.12)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)' }}
            >
              {slot && (
                <>
                  {/* Imagem do item — contida dentro do slot com padding interno */}
                  <img
                    src={slot.image}
                    alt={slot.title}
                    className="animate-slot-pop"
                    style={{
                      position: 'absolute',
                      inset: '12%',          /* padding visual dentro do slot */
                      width: '76%',
                      height: '76%',
                      objectFit: 'contain',
                      display: 'block',
                    }}
                  />

                  {/* Badge de prioridade — canto inferior direito */}
                  <div style={{
                    position: 'absolute',
                    bottom: '2px',
                    right: '2px',
                    background: 'rgba(0,0,0,0.75)',
                    borderRadius: '2px',
                    padding: '1px 3px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1px',
                    lineHeight: 1,
                    zIndex: 2,
                  }}>
                    <span style={{ fontFamily: 'var(--font-pixel)', fontSize: '7px', color: '#fde68a', textShadow: '0 0 4px #f59e0b' }}>
                      {slot.priority}
                    </span>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ChestGrid