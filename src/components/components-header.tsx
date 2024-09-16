"'use client'"

import { useState } from "'react'"
import Link from "'next/link'"
import { Search, ShoppingCart, User, Menu, X } from "'lucide-react'"

export function HeaderComponent() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-black bg-opacity-50 backdrop-blur-md text-white sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-2xl font-bold text-white">
            Dream<span className="text-[#db991e]">Store</span>
          </Link>
          <div className="flex items-center space-x-4">
            <button aria-label="Search" className="text-white hover:text-[#db991e] transition duration-300">
              <Search size={20} />
            </button>
            <button aria-label="Shopping Cart" className="text-white hover:text-[#db991e] transition duration-300">
              <ShoppingCart size={20} />
            </button>
            <button aria-label="Sign In" className="text-white hover:text-[#db991e] transition duration-300">
              <User size={20} />
            </button>
            <button 
              aria-label="Menu" 
              className="md:hidden text-white hover:text-[#db991e] transition duration-300"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
        <nav className={`${isMenuOpen ? "'block'" : "'hidden'"} md:block py-4`}>
          <ul className="flex flex-col md:flex-row md:justify-center md:space-x-8 space-y-2 md:space-y-0">
            {["'Products'", "'Collections'", "'About'", "'Contact'"].map((item) => (
              <li key={item}>
                <Link href={`/${item.toLowerCase()}`} className="text-sm text-white hover:text-[#db991e] transition-all duration-300 relative group">
                  {item}
                  <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-[#db991e] transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}