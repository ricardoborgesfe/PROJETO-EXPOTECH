function TruckCard({
  truck,
  usedCapacity,
  efficiency
}) {

  return (

    <div className="
      bg-[#2d2d2d]
      p-6
      rounded-xl
      border border-gray-700
      shadow-lg
      space-y-4
    ">

      <h2 className="text-2xl font-bold text-green-400">
        🚚 {truck.name}
      </h2>

      <div>

        <p>Capacidade Máxima</p>

        <p className="font-bold">
          {truck.capacity}kg
        </p>

      </div>

      <div>

        <p>Carga Atual</p>

        <p className="font-bold">
          {usedCapacity}kg
        </p>

      </div>

      <div>

        <p>Status</p>

        <p className="text-yellow-400 font-bold">
          {truck.status}
        </p>

      </div>

      <div>

        <p>Eficiência</p>

        <p className="text-green-400 text-3xl font-bold">
          {efficiency}%
        </p>

      </div>

    </div>
  )
}

export default TruckCard