const slots = Array(27).fill(null)

function ChestGrid() {

  return (

    <div className="bg-[#c6c6c6] p-4 border-4 border-[#555] shadow-2xl">

      <div className="grid grid-cols-9 gap-1">

        {slots.map((_, index) => (

          <div
            key={index}
            className="
              w-16 h-16
              bg-[#8b8b8b]
              border-t-4 border-l-4
              border-[#373737]
              shadow-inner
              flex items-center justify-center
              hover:bg-[#9e9e9e]
              transition-all
            "
          >
            📦
          </div>

        ))}

      </div>

    </div>

  )
}

export default ChestGrid