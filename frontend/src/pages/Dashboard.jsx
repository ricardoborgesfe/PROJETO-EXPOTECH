import { useState, useEffect, useRef } from 'react'
import Navbar from '../components/Navbar'
import ChestGrid from '../components/ChestGrid'
import ProductList from '../components/ProductList'
import StatsPanel from '../components/StatsPanel'
import TruckCard from '../components/TruckCard'
import TruckFleet from '../components/TruckFleet'
import LoadingSpinner from '../components/LoadingSpinner'
import api from '../services/api'
import { buildInventory, refreshInventory } from '../services/fakeStore'

const TRUCK = { name: 'TRUCK ALPHA', capacity: 100 }
const TRUCK_TRANSIT_MS = 120_000
let truckCounter = 1

function Dashboard() {
  const [inventory, setInventory]             = useState([])   // 20 product types with qty
  const [loadingInventory, setLoadingInventory] = useState(true)

  const [optimizedProducts, setOptimizedProducts] = useState([])
  const [efficiency, setEfficiency]           = useState(0)
  const [usedCapacity, setUsedCapacity]       = useState(0)
  const [optimizing, setOptimizing]           = useState(false)
  const [hasOptimized, setHasOptimized]       = useState(false)

  const [truckStatus, setTruckStatus]         = useState('ESPERANDO')
  const [canCallNext, setCanCallNext]         = useState(false)

  const [fleet, setFleet]                     = useState([])
  const fleetTimers                           = useRef({})
  const inventoryRef                          = useRef([])

  // keep ref in sync for use inside closures
  useEffect(() => { inventoryRef.current = inventory }, [inventory])

  // --- Initial load ---
  useEffect(() => {
    buildInventory(20).then(items => {
      setInventory(items)
      setLoadingInventory(false)
    })
    return () => Object.values(fleetTimers.current).forEach(clearTimeout)
  }, [])

  // --- Truck status ---
  useEffect(() => {
    if (truckStatus === 'EM TRANSPORTE') return
    setTruckStatus(optimizedProducts.length > 0 ? 'PRONTO PARA IR' : 'ESPERANDO')
  }, [optimizedProducts]) // eslint-disable-line

  // --- Optimize ---
  async function optimizeLoad() {
    if (inventory.length === 0 || truckStatus === 'EM TRANSPORTE') return
    try {
      setOptimizing(true)
      const res = await api.post('/optimize', {
        products: inventory,          // each has id, weight, priority, qty
        capacity: TRUCK.capacity,
      })
      setOptimizedProducts(res.data.selected_products)  // each has chosen_qty
      setEfficiency(res.data.efficiency)
      setUsedCapacity(res.data.used_capacity)
      setHasOptimized(true)
    } catch (err) {
      console.error(err)
      alert('Erro ao otimizar. Verifique se o backend está rodando.')
    } finally {
      setOptimizing(false)
    }
  }

  // --- Dispatch truck ---
  function dispatchTruck() {
    if (optimizedProducts.length === 0) return

    const truckId = truckCounter++
    setFleet(prev => [{
      id: truckId,
      name: `TRUCK #${truckId}`,
      itemCount: optimizedProducts.reduce((s, p) => s + p.chosen_qty, 0),
      totalWeight: usedCapacity,
      efficiency,
      departedAt: Date.now(),
    }, ...prev])

    setTruckStatus('EM TRANSPORTE')
    setCanCallNext(true)

    // Deduct dispatched quantities from inventory
    const dispatched = new Map(optimizedProducts.map(p => [p.id, p.chosen_qty]))
    setInventory(prev =>
      prev.map(item => {
        const sent = dispatched.get(item.id) || 0
        return { ...item, qty: item.qty - sent }
      }).filter(item => item.qty > 0)   // remove fully depleted types
    )

    setOptimizedProducts([])
    setEfficiency(0)
    setUsedCapacity(0)
    setHasOptimized(false)

    const timer = setTimeout(() => {
      setFleet(prev => prev.filter(t => t.id !== truckId))
      delete fleetTimers.current[truckId]
    }, TRUCK_TRANSIT_MS)
    fleetTimers.current[truckId] = timer

    setTimeout(() => setTruckStatus('ESPERANDO'), 400)
  }

  // --- Call next batch ---
  async function callNextBatch() {
    if (!canCallNext) return
    const current = inventoryRef.current
    const refreshed = await refreshInventory(current, 10)
    setInventory(refreshed)
    setCanCallNext(false)
    setOptimizedProducts([])
    setEfficiency(0)
    setUsedCapacity(0)
    setHasOptimized(false)
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0e0e0e', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      <div style={{
        flex: 1, display: 'grid',
        gridTemplateColumns: '260px 1fr 290px',
        gap: '12px', padding: '12px', boxSizing: 'border-box', alignItems: 'start',
      }}>

        {/* LEFT */}
        <aside style={{
          background: 'rgba(18,18,18,0.95)', border: '1px solid #2a2a2a',
          borderRadius: '8px', padding: '14px', display: 'flex', flexDirection: 'column',
          height: 'calc(100vh - 80px)', boxSizing: 'border-box',
        }}>
          <ProductList
            visibleItems={inventory}
            onCallNext={callNextBatch}
            canCallNext={canCallNext}
            loading={loadingInventory}
          />
        </aside>

        {/* CENTER */}
        <main style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontFamily: 'var(--font-pixel)', fontSize: '0.4rem', color: '#6b7280', letterSpacing: '0.1em', whiteSpace: 'nowrap' }}>
              CARGA OTIMIZADA
            </span>
            <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, #3a3a3a, transparent)' }} />
            {hasOptimized && optimizedProducts.length > 0 && (
              <span style={{ padding: '2px 8px', borderRadius: '4px', background: 'rgba(74,222,128,0.1)', border: '1px solid rgba(74,222,128,0.3)', color: '#4ade80', fontFamily: 'var(--font-ui)', fontSize: '0.63rem', fontWeight: 700, whiteSpace: 'nowrap' }}>
                ✓ {optimizedProducts.reduce((s,p) => s+p.chosen_qty, 0)} un · {usedCapacity}kg
              </span>
            )}
          </div>

          <ChestGrid selectedProducts={optimizedProducts} />

          <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', padding: '4px 0', flexWrap: 'wrap' }}>
            {optimizing ? <LoadingSpinner /> : (
              <button onClick={optimizeLoad}
                disabled={inventory.length === 0 || truckStatus === 'EM TRANSPORTE'}
                style={{
                  fontFamily: 'var(--font-pixel)', fontSize: '0.46rem', letterSpacing: '0.1em', padding: '12px 28px',
                  background: (inventory.length === 0 || truckStatus === 'EM TRANSPORTE') ? '#1a1a1a' : 'linear-gradient(135deg, #16a34a, #4ade80)',
                  color: (inventory.length === 0 || truckStatus === 'EM TRANSPORTE') ? '#4b5563' : '#000',
                  border: 'none', borderRadius: '6px',
                  cursor: (inventory.length === 0 || truckStatus === 'EM TRANSPORTE') ? 'not-allowed' : 'pointer',
                  boxShadow: (inventory.length > 0 && truckStatus !== 'EM TRANSPORTE') ? '0 0 18px rgba(74,222,128,0.3)' : 'none',
                  transition: 'all 0.2s',
                }}>
                ⚡ OTIMIZAR CARGA
              </button>
            )}

            {optimizedProducts.length > 0 && !optimizing && (
              <button onClick={dispatchTruck} style={{
                fontFamily: 'var(--font-pixel)', fontSize: '0.46rem', letterSpacing: '0.1em', padding: '12px 28px',
                background: 'linear-gradient(135deg, #b45309, #fbbf24)',
                color: '#000', border: 'none', borderRadius: '6px', cursor: 'pointer',
                boxShadow: '0 0 18px rgba(251,191,36,0.4)',
                animation: 'pulse-border 1.5s ease-in-out infinite',
              }}>
                🚚 DESPACHAR CAMINHÃO
              </button>
            )}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 12px', borderRadius: '6px', background: 'rgba(74,222,128,0.04)', border: '1px solid rgba(74,222,128,0.1)' }}>
            <span style={{ fontSize: '0.85rem', flexShrink: 0 }}>🧠</span>
            <p style={{ fontFamily: 'var(--font-ui)', fontSize: '0.68rem', color: '#6b7280', fontWeight: 500, margin: 0 }}>
              <strong style={{ color: '#9ca3af' }}>Knapsack Bounded (DP)</strong> — decide quantas unidades de cada tipo maximizam a prioridade sem exceder {TRUCK.capacity}kg
            </p>
          </div>
        </main>

        {/* RIGHT */}
        <aside style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <TruckCard truck={TRUCK} usedCapacity={usedCapacity} efficiency={efficiency} status={truckStatus} />
          <StatsPanel efficiency={efficiency} usedCapacity={usedCapacity} selectedProducts={optimizedProducts} />
          {fleet.length > 0 && <TruckFleet trucks={fleet} />}
        </aside>
      </div>
    </div>
  )
}

export default Dashboard