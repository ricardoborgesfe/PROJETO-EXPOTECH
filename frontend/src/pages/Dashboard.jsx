import { useState } from 'react'
import Navbar from '../components/Navbar'
import ChestGrid from '../components/ChestGrid'
import ProductList from '../components/ProductList'
import StatsPanel from '../components/StatsPanel'
import TruckCard from '../components/TruckCard'
import LoadingSpinner from '../components/LoadingSpinner'
import api from '../services/api'
import trucks from '../data/mockTrucks'

function Dashboard() {
  const [products, setProducts] = useState([])
  const [optimizedProducts, setOptimizedProducts] = useState([])
  const [efficiency, setEfficiency] = useState(0)
  const [usedCapacity, setUsedCapacity] = useState(0)
  const [loading, setLoading] = useState(false)
  const [hasOptimized, setHasOptimized] = useState(false)

  async function optimizeLoad() {
    try {
      setLoading(true)
      const response = await api.post('/optimize', { products, capacity: 100 })
      setOptimizedProducts(response.data.selected_products)
      setEfficiency(response.data.efficiency)
      setUsedCapacity(response.data.used_capacity)
      setHasOptimized(true)
    } catch (error) {
      console.error(error)
      alert('Erro ao otimizar carga')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0e0e0e', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      <div style={{
        flex: 1,
        display: 'grid',
        gridTemplateColumns: '260px 1fr 280px',
        gridTemplateRows: '1fr',
        gap: '12px',
        padding: '12px',
        boxSizing: 'border-box',
        alignItems: 'start',
      }}>

        {/* LEFT */}
        <aside style={{
          background: 'rgba(18,18,18,0.95)',
          border: '1px solid #2a2a2a',
          borderRadius: '8px',
          padding: '14px',
          display: 'flex',
          flexDirection: 'column',
          height: 'calc(100vh - 80px)',
          boxSizing: 'border-box',
        }}>
          <ProductList setProducts={setProducts} selectedProducts={optimizedProducts} />
        </aside>

        {/* CENTER */}
        <main style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>

          {/* Label row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontFamily: 'var(--font-pixel)', fontSize: '0.42rem', color: '#6b7280', letterSpacing: '0.1em', whiteSpace: 'nowrap' }}>
              CARGA OTIMIZADA
            </span>
            <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, #3a3a3a, transparent)' }} />
            {hasOptimized && (
              <span style={{ padding: '2px 8px', borderRadius: '4px', background: 'rgba(74,222,128,0.1)', border: '1px solid rgba(74,222,128,0.3)', color: '#4ade80', fontFamily: 'var(--font-ui)', fontSize: '0.65rem', fontWeight: 700, whiteSpace: 'nowrap' }}>
                ✓ OTIMIZADO
              </span>
            )}
          </div>

          {/* Chest */}
          <ChestGrid selectedProducts={optimizedProducts} />

          {/* Button */}
          <div style={{ display: 'flex', justifyContent: 'center', padding: '6px 0' }}>
            {loading ? <LoadingSpinner /> : (
              <button
                onClick={optimizeLoad}
                disabled={products.length === 0}
                style={{
                  fontFamily: 'var(--font-pixel)', fontSize: '0.5rem',
                  letterSpacing: '0.12em', padding: '13px 34px',
                  background: products.length === 0 ? '#1a1a1a' : 'linear-gradient(135deg, #16a34a, #4ade80)',
                  color: products.length === 0 ? '#4b5563' : '#000',
                  border: 'none', borderRadius: '6px',
                  cursor: products.length === 0 ? 'not-allowed' : 'pointer',
                  boxShadow: products.length > 0 ? '0 0 20px rgba(74,222,128,0.3), 0 4px 12px rgba(0,0,0,0.5)' : 'none',
                  transition: 'all 0.2s',
                }}
              >
                ⚡ OTIMIZAR CARGA
              </button>
            )}
          </div>

          {/* Algorithm note */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '9px 13px', borderRadius: '6px', background: 'rgba(74,222,128,0.04)', border: '1px solid rgba(74,222,128,0.1)' }}>
            <span style={{ fontSize: '0.9rem', flexShrink: 0 }}>🧠</span>
            <p style={{ fontFamily: 'var(--font-ui)', fontSize: '0.7rem', color: '#6b7280', fontWeight: 500, margin: 0 }}>
              Algoritmo <strong style={{ color: '#9ca3af' }}>Knapsack Greedy</strong> — seleciona itens por prioridade até o limite de capacidade
            </p>
          </div>
        </main>

        {/* RIGHT */}
        <aside style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <TruckCard truck={trucks[0]} usedCapacity={usedCapacity} efficiency={efficiency} />
          <StatsPanel efficiency={efficiency} usedCapacity={usedCapacity} selectedProducts={optimizedProducts} />
        </aside>

      </div>
    </div>
  )
}

export default Dashboard