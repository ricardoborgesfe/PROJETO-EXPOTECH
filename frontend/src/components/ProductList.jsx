import ProductCard from './ProductCard'

const products = [
  {
    id: 1,
    name: 'Notebook',
    weight: 5,
    priority: 10,
    image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg'
  },
  {
    id: 2,
    name: 'Monitor',
    weight: 7,
    priority: 8,
    image: 'https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg'
  }
]

function ProductList() {

  return (
    <div>

      <h2 className="text-2xl font-bold mb-4">
        Produtos
      </h2>

      <div className="space-y-4">

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