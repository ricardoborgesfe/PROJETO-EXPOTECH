import chestBg from '../assets/chest-bg.png'
import slotTexture from '../assets/minecraft-slot.png'

function ChestGrid({ selectedProducts }) {

  const slots = Array(27).fill(null)

  selectedProducts.forEach((product, index) => {

    if (index < 27) {

      slots[index] = product
    }
  })

  return (

    <div
      className="
        p-6
        rounded-lg
        shadow-2xl
        bg-cover
        bg-center
        border-4 border-[#4b4b4b]
      "
      style={{
        backgroundImage: `url(${chestBg})`
      }}
    >

      <h2 className="
        text-white
        text-2xl
        font-bold
        mb-4
        drop-shadow-lg
      ">
        Inventário
      </h2>

      <div className="grid grid-cols-9 gap-2">

        {slots.map((slot, index) => (

          <div
            key={index}
            className="
              w-16 h-16
              bg-cover
              bg-center
              flex items-center justify-center
              hover:scale-105
              transition-all
              duration-200
            "
            style={{
              backgroundImage: `url(${slotTexture})`
            }}
          >

            {slot ? (

              <img
                src={slot.image}
                alt={slot.title}
                className="
                  w-12 h-12
                  object-contain
                  drop-shadow-lg
                "
              />

            ) : null}

          </div>

        ))}

      </div>

    </div>
  )
}

export default ChestGrid