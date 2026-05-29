import { useState } from 'react'
import ProductCard from './ProductCard'

function ProductList({ visibleItems, onCallNext, canCallNext, loading }) {
  const [search, setSearch] = useState('')

  const filtered = visibleItems.filter(p =>
    p.title.toLowerCase().includes(search.toLowerCase())
  )

  // total units currently in inventory
  const totalUnits = visibleItems.reduce((s, p) => s + p.qty, 0)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px', flexShrink: 0 }}>
        <span style={{ fontFamily: 'var(--font-pixel)', fontSize: '0.42rem', color: '#e5e5e5', letterSpacing: '0.08em' }}>
          INVENTÁRIO
        </span>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <span style={{ fontFamily: 'var(--font-ui)', fontSize: '0.65rem', color: '#6b7280', fontWeight: 600 }}>
            {visibleItems.length} tipos
          </span>
          <span style={{ fontFamily: 'var(--font-ui)', fontSize: '0.65rem', color: '#9ca3af', fontWeight: 700 }}>
            {totalUnits} un
          </span>
        </div>
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="Buscar produto..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{
          width: '100%', padding: '7px 10px', borderRadius: '5px',
          background: '#1a1a1a', border: '1px solid #3a3a3a',
          color: '#e5e5e5', fontFamily: 'var(--font-ui)', fontSize: '0.76rem',
          outline: 'none', marginBottom: '8px', boxSizing: 'border-box', flexShrink: 0,
        }}
      />

      {/* List */}
      <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '5px', minHeight: 0 }}
        className="scrollbar-thin">
        {loading ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100px', gap: '10px' }}>
            <div style={{ width: '26px', height: '26px', border: '2px solid #4ade80', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
            <span style={{ fontFamily: 'var(--font-pixel)', fontSize: '0.36rem', color: '#6b7280' }}>CARREGANDO...</span>
          </div>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '20px', color: '#6b7280', fontFamily: 'var(--font-ui)', fontSize: '0.75rem' }}>
            Nenhum item encontrado
          </div>
        ) : (
          filtered.map(product => (
            <ProductCard key={product.id} product={product} />
          ))
        )}
      </div>

      {/* Call Next Batch button */}
      <div style={{ flexShrink: 0, paddingTop: '10px' }}>
        <button
          onClick={onCallNext}
          disabled={!canCallNext}
          style={{
            width: '100%', padding: '11px', borderRadius: '6px',
            fontFamily: 'var(--font-pixel)', fontSize: '0.4rem', letterSpacing: '0.1em',
            border: 'none',
            cursor: canCallNext ? 'pointer' : 'not-allowed',
            background: canCallNext ? 'linear-gradient(135deg, #1d4ed8, #60a5fa)' : '#1a1a1a',
            color: canCallNext ? '#fff' : '#4b5563',
            boxShadow: canCallNext ? '0 0 16px rgba(96,165,250,0.3)' : 'none',
            transition: 'all 0.3s',
          }}
        >
          {canCallNext ? '📦 CHAMAR PRÓXIMA LEVA' : '🔒 ENVIE O CAMINHÃO PRIMEIRO'}
        </button>
      </div>
    </div>
  )
}

export default ProductList