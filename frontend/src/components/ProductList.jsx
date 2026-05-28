import { useEffect, useState } from 'react'

import ProductCard from './ProductCard'

import { getProducts } from '../services/fakeStore'

function ProductList({ setProducts }) {

  const [products, setLocalProducts] = useState([])

  useEffect(() => {

    async function loadProducts() {

      const data = await getProducts()

      setLocalProducts(data)

      setProducts(data)
    }

    loadProducts()

  }, [])

  return (

    <div>

      <h2 className="text-2xl font-bold mb-4">
        Produtos
      </h2>

      <div className="space-y-4 overflow-y-auto h-[700px] pr-2">

        {products.map((product) => (

          <ProductCard
            key={product.id}
            product={product}
          />

        ))}

      </div>

    </div>
  )
}

export default ProductList