import { useEffect, useState } from 'react'
import ProductCard from './ProductCard'
import { getProducts } from '../services/fakeStore'

function ProductList({ setProducts, selectedProducts = [] }) {
  const [products, setLocalProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    async function loadProducts() {
      const data = await getProducts()
      setLocalProducts(data)
      setProducts(data)
      setLoading(false)
    }
    loadProducts()
  }, [])

  const filtered = products.filter(p =>
    p.title.toLowerCase().includes(search.toLowerCase())
  )

  const selectedIds = new Set(selectedProducts.map(p => p.id))

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
        <span style={{ fontFamily: 'var(--font-pixel)', fontSize: '0.45rem', color: '#e5e5e5', letterSpacing: '0.08em' }}>
          INVENTÁRIO
        </span>
        <span style={{ fontFamily: 'var(--font-ui)', fontSize: '0.7rem', color: '#6b7280', fontWeight: 600 }}>
          {products.length} itens
        </span>
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
          color: '#e5e5e5', fontFamily: 'var(--font-ui)', fontSize: '0.78rem',
          outline: 'none', marginBottom: '10px', boxSizing: 'border-box',
        }}
      />

      {/* List */}
      <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '6px' }}
        className="scrollbar-thin">
        {loading ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '120px', gap: '10px' }}>
            <div style={{ width: '28px', height: '28px', border: '2px solid #4ade80', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
            <span style={{ fontFamily: 'var(--font-pixel)', fontSize: '0.38rem', color: '#6b7280' }}>CARREGANDO...</span>
          </div>
        ) : filtered.map(product => (
          <ProductCard key={product.id} product={product} isSelected={selectedIds.has(product.id)} />
        ))}
      </div>
    </div>
  )
}

export default ProductList