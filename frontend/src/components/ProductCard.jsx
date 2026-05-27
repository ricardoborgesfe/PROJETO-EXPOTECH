function ProductCard({ product }) {

  return (
    <div className="
      bg-[#2d2d2d]
      p-4
      rounded-xl
      border border-gray-700
      flex items-center gap-4
      shadow-lg
    ">

      <img
        src={product.image}
        alt={product.name}
        className="
          w-16 h-16
          bg-white
          rounded
          object-contain
          p-1
        "
      />

      <div>

        <h3 className="font-bold">
          {product.name}
        </h3>

        <p>
          Peso: {product.weight}kg
        </p>

        <p>
          Prioridade: {product.priority}
        </p>

      </div>

    </div>
  )
}

export default ProductCard