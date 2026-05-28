function ProductCard({ product, isSelected = false }) {
  const priorityColor = product.priority >= 8 ? '#4ade80' : product.priority >= 5 ? '#fbbf24' : '#f87171'

  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 10px', borderRadius: '6px',
      background: isSelected ? 'rgba(74,222,128,0.08)' : 'rgba(30,30,30,0.9)',
      border: isSelected ? '1px solid rgba(74,222,128,0.4)' : '1px solid #2a2a2a',
      boxShadow: isSelected ? '0 0 10px rgba(74,222,128,0.12)' : 'none',
      flexShrink: 0,
    }}>
      <div style={{ width: '44px', height: '44px', flexShrink: 0, background: '#fff', borderRadius: '5px', border: '1px solid #3a3a3a', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        <img src={product.image} alt={product.title} style={{ width: '38px', height: '38px', objectFit: 'contain' }} />
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontFamily: 'var(--font-ui)', fontSize: '0.75rem', fontWeight: 600, color: '#e5e5e5', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {product.title.length > 25 ? product.title.slice(0, 25) + '…' : product.title}
        </p>
        <div style={{ display: 'flex', gap: '10px', marginTop: '3px' }}>
          <span style={{ fontFamily: 'var(--font-ui)', fontSize: '0.65rem', color: '#9ca3af' }}>⚖ {product.weight}kg</span>
          <span style={{ fontFamily: 'var(--font-ui)', fontSize: '0.65rem', color: priorityColor, fontWeight: 700 }}>★ P{product.priority}</span>
        </div>
      </div>

      {isSelected && <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#4ade80', flexShrink: 0 }} />}
    </div>
  )
}

export default ProductCard