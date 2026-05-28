function CapacityBar({ efficiency }) {

  return (

    <div>

      <p>Capacidade</p>

      <div className="w-full bg-gray-700 rounded-full h-5 mt-2">

        <div
          className="
            bg-green-400
            h-5
            rounded-full
            transition-all
          "
          style={{
            width: `${efficiency}%`
          }}
        ></div>

      </div>

    </div>
  )
}

export default CapacityBar