"use client"

import { Smartphone, Laptop, Tv, Headphones, Watch, Camera, Gamepad, Cpu } from 'lucide-react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"

const categories = [
  { name: 'Smartphones', icon: Smartphone },
  { name: 'Laptops', icon: Laptop },
  { name: 'TVs', icon: Tv },
  { name: 'Audio', icon: Headphones },
  { name: 'Wearables', icon: Watch },
  { name: 'Cameras', icon: Camera },
  { name: 'Gaming', icon: Gamepad },
  { name: 'Components', icon: Cpu },
]

export default function ExploreCategories() {
  return (
    <section className="py-24 bg-background" id='categories'>
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-light mb-12 text-center text-black">Explore Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {categories.map((category) => (
            <motion.div
              key={category.name}
              className=" flex flex-col items-center"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <div className="w-20 h-20 bg-[#f9f9fc] flex items-center justify-center mb-3 transition-colors duration-300">
                <category.icon size={28} className="text-black bg" />
              </div>
              <h3 className="text-sm font-medium text-black/80 transition-colors duration-300">{category.name}</h3>
            </motion.div>
          ))}
        </div>
        <div className="mt-16 text-center">
          <Button
            variant="outline"
            size="lg"
            className="text-primary border-primary hover:bg-primary/10 transition duration-300"
          >
            View All Categories
          </Button>
        </div>
      </div>
    </section>
  )
}