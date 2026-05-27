import Navbar from '../components/Navbar'
import ChestGrid from '../components/ChestGrid'
import ProductList from '../components/ProductList'
import StatsPanel from '../components/StatsPanel'

function Dashboard() {

  return (
    <div className="min-h-screen bg-[#1e1e1e] text-white">

      <Navbar />

      <div className="grid grid-cols-3 gap-6 p-6">

        <div>
          <ProductList />
        </div>

        <div className="flex flex-col items-center">

          <h2 className="text-2xl font-bold mb-4">
            Caminhão
          </h2>

          <ChestGrid />

        </div>

        <div>
          <StatsPanel />
        </div>

      </div>

    </div>
  )
}

export default Dashboard