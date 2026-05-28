import truckImage from '../assets/truck.png'

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
      border-4 border-[#4b4b4b]
      shadow-2xl
      space-y-4
    ">

      <h2 className="
        text-3xl
        font-bold
        text-green-400
        text-center
      ">
        🚚 {truck.name}
      </h2>

      <img
        src={truckImage}
        alt="Truck"
        className="
          w-40
          mx-auto
          drop-shadow-xl
        "
      />

      <div className="space-y-2 text-lg">

        <p>
          Capacidade Máxima:
          <span className="font-bold ml-2">
            {truck.capacity}kg
          </span>
        </p>

        <p>
          Carga Atual:
          <span className="font-bold ml-2">
            {usedCapacity}kg
          </span>
        </p>

        <p>
          Status:
          <span className="
            text-yellow-400
            font-bold
            ml-2
          ">
            {truck.status}
          </span>
        </p>

      </div>

      <div>

        <p className="mb-2 text-lg">
          Eficiência
        </p>

        <div className="
          w-full
          bg-gray-700
          rounded-full
          h-6
        ">

          <div
            className="
              bg-green-400
              h-6
              rounded-full
              transition-all
              duration-500
            "
            style={{
              width: `${efficiency}%`
            }}
          ></div>

        </div>

        <p className="
          text-green-400
          text-3xl
          font-bold
          mt-2
          text-center
        ">
          {efficiency}%
        </p>

      </div>

    </div>
  )
}

export default TruckCard