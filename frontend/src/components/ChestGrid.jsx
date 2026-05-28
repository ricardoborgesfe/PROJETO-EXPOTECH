function ChestGrid({ selectedProducts }) {

  const slots = Array(27).fill(null)

  selectedProducts.forEach((product, index) => {

    if (index < 27) {

      slots[index] = product
    }
  })

  return (

    <div className="
      bg-[#c6c6c6]
      p-4
      border-4
      border-[#555]
      shadow-2xl
    ">

      <div className="grid grid-cols-9 gap-1">

        {slots.map((slot, index) => (

          <div
            key={index}
            className="
              w-16 h-16
              bg-[#8b8b8b]
              border-t-4 border-l-4
              border-b-4 border-r-4
              border-t-[#cfcfcf]
              border-l-[#cfcfcf]
              border-b-[#373737]
              border-r-[#373737]
              shadow-inner
              flex items-center justify-center
              hover:brightness-110
              transition-all
              overflow-hidden
            "
          >

            {slot ? (

              <img
                src={slot.image}
                alt={slot.title}
                className="w-12 h-12 object-contain"
              />

            ) : null}

          </div>

        ))}

      </div>

    </div>
  )
}

export default ChestGrid