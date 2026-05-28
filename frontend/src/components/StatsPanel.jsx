import CapacityBar from './CapacityBar'
import TruckStatus from './TruckStatus'

function StatsPanel({
  efficiency,
  usedCapacity,
  selectedProducts
}) {

  return (

    <div className="
      bg-[#2d2d2d]
      p-6
      rounded-xl
      border border-gray-700
      space-y-6
      shadow-lg
    ">

      <h2 className="text-2xl font-bold text-green-400">
        Status
      </h2>

      <CapacityBar efficiency={efficiency} />

      <TruckStatus />

      <div>

        <p>Eficiência</p>

        <p className="text-3xl text-green-400 font-bold">
          {efficiency}%
        </p>

      </div>

      <div>

        <p>Peso Utilizado</p>

        <p className="text-xl font-bold">
          {usedCapacity}kg
        </p>

      </div>

      <div>

        <p>Itens Selecionados</p>

        <p className="text-xl font-bold">
          {selectedProducts.length}
        </p>

      </div>

    </div>
  )
}

export default StatsPanel