import ProductCarousel from './product-carousel'

const generateProducts = (category: string, count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: `${category} ${i + 1}`,
    price: Math.floor(Math.random() * 900) + 100,
    image: `/placeholder.svg?height=300&width=300&text=${category}+${i + 1}`
  }))
}

const phoneProducts = generateProducts('Phone', 12)
const laptopProducts = generateProducts('Laptop', 10)
const tvProducts = generateProducts('TV', 8)

export default function ProductShowcase() {
  return (
    <div className="space-y-12" id='products'>
      <ProductCarousel category="Phones" products={phoneProducts} />
      <ProductCarousel category="Laptops" products={laptopProducts} />
      <ProductCarousel category="TVs" products={tvProducts} />
    </div>
  )
}