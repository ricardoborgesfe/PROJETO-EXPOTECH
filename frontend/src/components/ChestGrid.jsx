import chestBg from '../assets/chest-bg.png'
import slotTexture from '../assets/minecraft-slot.png'

/**
 * selectedProducts: array of product objects with `chosen_qty` field.
 * Each product occupies ONE slot in the grid, showing its image + chosen_qty badge.
 */
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
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <span style={{ fontFamily: 'var(--font-ui)', fontSize: '0.68rem', color: '#6b7280', fontWeight: 600 }}>
            {selectedProducts.length} tipos · {selectedProducts.reduce((s, p) => s + (p.chosen_qty || 1), 0)} unidades
          </span>
          <span style={{ fontFamily: 'var(--font-ui)', fontSize: '0.68rem', color: '#6b7280', fontWeight: 600 }}>
            {selectedProducts.reduce((s, p) => s + (p.chosen_qty || 1) * p.weight, 0)}kg total
          </span>
        </div>
      </div>

      {/* Grid */}
      <div style={{ padding: '10px', backgroundImage: `url(${chestBg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(9, 1fr)', gap: '5px' }}>
          {slots.map((slot, index) => (
            <div
              key={index}
              title={slot ? `${slot.title}\n${slot.chosen_qty}x · ${slot.chosen_qty * slot.weight}kg · P${slot.priority}` : ''}
              style={{
                aspectRatio: '1 / 1',
                backgroundImage: `url(${slotTexture})`,
                backgroundSize: '100% 100%',
                imageRendering: 'pixelated',
                position: 'relative',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                overflow: 'hidden',
                cursor: slot ? 'pointer' : 'default',
                transition: 'transform 0.15s ease',
              }}
              onMouseEnter={e => { if (slot) e.currentTarget.style.transform = 'scale(1.12)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)' }}
            >
              {slot && (
                <>
                  <img
                    src={slot.image}
                    alt={slot.title}
                    className="animate-slot-pop"
                    style={{ position: 'absolute', inset: '12%', width: '76%', height: '76%', objectFit: 'contain' }}
                  />
                  {/* Quantity badge — bottom right, white text on dark bg */}
                  <div style={{
                    position: 'absolute', bottom: '2px', right: '2px',
                    background: 'rgba(0,0,0,0.82)',
                    borderRadius: '2px', padding: '1px 3px',
                    lineHeight: 1, zIndex: 2,
                    display: 'flex', alignItems: 'center',
                  }}>
                    <span style={{
                      fontFamily: 'var(--font-pixel)',
                      fontSize: slot.chosen_qty >= 10 ? '5px' : '7px',
                      color: '#ffffff',
                      textShadow: '0 0 4px rgba(255,255,255,0.4)',
                      letterSpacing: 0,
                    }}>
                      {slot.chosen_qty}
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