function StatsPanel() {

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

      <div>

        <p>Capacidade</p>

        <div className="w-full bg-gray-700 rounded-full h-5 mt-2">

          <div className="
            bg-green-400
            h-5
            rounded-full
            w-[80%]
          "></div>

        </div>

      </div>

      <div>

        <p>Status do Caminhão</p>

        <p className="text-yellow-400 font-bold">
          EM TRANSPORTE
        </p>

      </div>

      <div>

        <p>Eficiência</p>

        <p className="text-3xl text-green-400 font-bold">
          87%
        </p>

      </div>

    </div>
  )
}

export default StatsPanel