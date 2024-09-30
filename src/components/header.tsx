'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Search, ShoppingCart, User, Menu, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { SignedIn, SignedOut, UserButton, useClerk } from '@clerk/nextjs'
import { usePathname, useRouter } from 'next/navigation'  // Changed to use `next/navigation` for App Router

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { openSignIn } = useClerk()
  const pathname = usePathname()  // Hook to get the current path (for App Router)
  const router = useRouter()      // Hook to navigate in the App Router

  const handleUserClick = () => {
    openSignIn()
  }

  const handleDashboardClick = () => {
    router.push('/dashboard')
  }

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-xl  text-gray-900">
            <span className="text-[#db991e]">D</span>reamstore
          </Link>
          <nav className="hidden md:flex space-x-8">
            {['Products', 'Categories', 'Deals', 'Support'].map((item) => (
              <Link 
                key={item} 
                href={`#${item.toLowerCase()}`} 
                className="text-gray-600 hover:text-blue-600 transition-colors duration-200"
              >
                {item}
              </Link>
            ))}
          </nav>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <Search className="h-5 w-5 text-gray-600" />
            </Button>
            <Button variant="ghost" size="icon">
              <ShoppingCart className="h-5 w-5 text-gray-600" />
            </Button>
            <SignedIn>
              <UserButton/>
              <Button variant="ghost" size="sm" onClick={handleDashboardClick}>
                Dashboard
              </Button>
            </SignedIn>
            <SignedOut>
              <Button variant="ghost" size="icon" onClick={handleUserClick}>
                <User className="h-5 w-5 text-gray-600" />
              </Button>
            </SignedOut>
            <Button 
              variant="ghost" 
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden bg-white py-4">
          <nav className="flex flex-col space-y-4 px-4">
            {['Products', 'Categories', 'Deals', 'Support'].map((item) => (
              <Link 
                key={item} 
                href={`/${item.toLowerCase()}`} 
                className="text-gray-600 hover:text-blue-600 transition-colors duration-200"
              >
                {item}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}