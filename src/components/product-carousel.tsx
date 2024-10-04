"use client"

import { useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"

interface Product {
  _id: string
  productName: string
  fixedPrice: number
  productPrev: string
}

interface ProductCarouselProps {
  category: string
  products: Product[]
}

const ProductCard = ({ product }: { product: Product }) => (
  <motion.div
    className="flex flex-col items-center"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.3 }}
  >
    <div className="relative w-full aspect-square mb-2 bg-gray-100 rounded-lg overflow-hidden">
      <Image
        src={product.productPrev}
        alt={product.productName}
        layout="fill"
        objectFit="cover"
        className="transition-transform duration-300 hover:scale-105"
      />
    </div>
    <h3 className="text-sm font-medium text-foreground mb-1 text-center">{product.productName}</h3>
    <span className="text-sm text-primary">${product.fixedPrice}</span>
  </motion.div>
)

export default function ProductCarousel({ category, products }: ProductCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showAll, setShowAll] = useState(false)

  if (!products || products.length === 0) {
    return (
      <section className="py-8 bg-background text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-light mb-4 text-foreground text-center">{category}</h2>
          <p className="text-muted-foreground">No products available at the moment.</p>
        </div>
      </section>
    )
  }

  const productsPerPage = 4
  const totalPages = Math.ceil(products.length / productsPerPage)

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalPages)
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalPages) % totalPages)
  }

  const visibleProducts = showAll
    ? products
    : products.slice(currentIndex * productsPerPage, (currentIndex + 1) * productsPerPage)

  return (
    <section className="py-8 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-light mb-6 text-foreground text-center">{category}</h2>
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
            >
              {visibleProducts.map((product) => {
                return <ProductCard key={product._id} product={product} />
              })}
            </motion.div>
          </AnimatePresence>
          {!showAll && (
            <>
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-1/2 -left-12 transform -translate-y-1/2"
                onClick={prevSlide}
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-1/2 -right-12 transform -translate-y-1/2"
                onClick={nextSlide}
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            </>
          )}
        </div>
        {!showAll && products.length > productsPerPage && (
          <div className="mt-6 text-center">
            <Button
              variant="outline"
              onClick={() => setShowAll(true)}
            >
              Show All
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}