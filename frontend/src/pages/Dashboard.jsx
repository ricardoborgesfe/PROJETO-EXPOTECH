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

async function optimizeLoad() {

  try {

    setLoading(true)

    const response = await api.post('/optimize', {
      products,
      capacity: 100
    })

    setOptimizedProducts(
      response.data.selected_products
    )

    setEfficiency(
      response.data.efficiency
    )

    setUsedCapacity(
      response.data.used_capacity
    )

  } catch (error) {

    console.error(error)

    alert('Erro ao otimizar carga')

  } finally {

    setLoading(false)
  }
}

  return (

    <div className="min-h-screen bg-[#1e1e1e] text-white">

      <Navbar />

      <div className="grid grid-cols-3 gap-6 p-6">

        <div>

          <ProductList
            setProducts={setProducts}
          />

        </div>

        <div className="flex flex-col items-center gap-4">

          <h2 className="text-2xl font-bold">
            Caminhão
          </h2>

          <ChestGrid
            selectedProducts={optimizedProducts}
          />

          {loading ? (

            <LoadingSpinner />

          ) : (

            <button
              onClick={optimizeLoad}
              className="
                bg-green-500
                hover:bg-green-600
                px-6 py-3
                rounded-xl
                font-bold
                transition-all
              "
            >
              OTIMIZAR CARGA
            </button>

          )}

        </div>

        <div className="space-y-4">

          <TruckCard
            truck={trucks[0]}
            usedCapacity={usedCapacity}
            efficiency={efficiency}
          />

          <StatsPanel
            efficiency={efficiency}
            usedCapacity={usedCapacity}
            selectedProducts={optimizedProducts}
          />

        </div>

      </div>

    </div>
  )
}

export default Dashboard