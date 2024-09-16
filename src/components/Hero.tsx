'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from "@/components/ui/button"

const slides = [
  {
    id: 1,
    url: 'https://images.unsplash.com/photo-1468436139062-f60a71c5c892?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    title: 'Next-Gen Technology',
    subtitle: 'Experience the future of electronics',
  },
  {
    id: 2,
    url: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    title: 'Smart Home Solutions',
    subtitle: 'Transform your living space',
  },
  {
    id: 3,
    url: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    title: 'Professional Grade Gear',
    subtitle: 'Elevate your work and creativity',
  },
]

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide()
    }, 5000)

    return () => clearInterval(timer)
  }, [currentIndex])

  const nextSlide = () => {
    setDirection(1)
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length)
  }

  const prevSlide = () => {
    setDirection(-1)
    setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length)
  }

  return (
    <div className="relative w-full h-[600px] overflow-hidden">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentIndex}
          custom={direction}
          initial={{ opacity: 0, x: direction > 0 ? 1000 : -1000 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: direction > 0 ? -1000 : 1000 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="absolute w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: `url(${slides[currentIndex].url})`,
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-40" />
          <div className="absolute inset-0 flex flex-col justify-center items-center text-white">
            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-5xl font-bold mb-4 text-center"
            >
              {slides[currentIndex].title}
            </motion.h1>
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-xl mb-8 text-center"
            >
              {slides[currentIndex].subtitle}
            </motion.p>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <Button size="lg" className="bg-foreground hover:bg-hoverForeground text-white">
                Shop Now
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>
      <Button
        variant="outline"
        size="icon"
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white text-gray-800 hover:bg-gray-100"
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white text-gray-800 hover:bg-gray-100"
      >
        <ChevronRight className="h-6 w-6" />
      </Button>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setDirection(i > currentIndex ? 1 : -1)
              setCurrentIndex(i)
            }}
            className={`w-3 h-3 rounded-full ${
              i === currentIndex ? 'bg-white' : 'bg-white bg-opacity-50'
            }`}
          />
        ))}
      </div>
    </div>
  )
}