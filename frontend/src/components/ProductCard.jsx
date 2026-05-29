function ProductCard({ product }) {
  const priorityColor = product.priority >= 8 ? '#4ade80' : product.priority >= 5 ? '#fbbf24' : '#f87171'
  const qtyColor = product.qty === 3 ? '#4ade80' : product.qty === 2 ? '#fbbf24' : '#f87171'

  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: '10px', padding: '7px 9px', borderRadius: '6px',
      background: 'rgba(28,28,28,0.95)', border: '1px solid #2a2a2a', flexShrink: 0,
    }}>
      {/* Thumbnail */}
      <div style={{ width: '42px', height: '42px', flexShrink: 0, background: '#fff', borderRadius: '4px', border: '1px solid #3a3a3a', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        <img src={product.image} alt={product.title} style={{ width: '36px', height: '36px', objectFit: 'contain' }} />
      </div>

      {/* Info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontFamily: 'var(--font-ui)', fontSize: '0.73rem', fontWeight: 600, color: '#e5e5e5', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {product.title.length > 24 ? product.title.slice(0, 24) + '…' : product.title}
        </p>
        <div style={{ display: 'flex', gap: '8px', marginTop: '3px', flexWrap: 'wrap' }}>
          <span style={{ fontFamily: 'var(--font-ui)', fontSize: '0.63rem', color: '#9ca3af' }}>⚖ {product.weight}kg/un</span>
          <span style={{ fontFamily: 'var(--font-ui)', fontSize: '0.63rem', color: priorityColor, fontWeight: 700 }}>★ P{product.priority}</span>
        </div>
      </div>

      {/* Qty badge */}
      <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
        <span style={{ fontFamily: 'var(--font-pixel)', fontSize: '0.55rem', color: qtyColor, lineHeight: 1 }}>{product.qty}</span>
        <span style={{ fontFamily: 'var(--font-ui)', fontSize: '0.55rem', color: '#6b7280', fontWeight: 600 }}>un</span>
      </div>
    </div>
  )
}

export default ProductCard