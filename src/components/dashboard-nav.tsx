import { Bell, Menu } from 'lucide-react'
import { motion } from 'framer-motion'
import { SignedIn, UserButton } from '@clerk/nextjs'

type NavbarProps = {
  toggleSidebar: () => void;
};

export default function Navbar({ toggleSidebar }: NavbarProps) {
  return (
    <motion.nav 
      className="bg-white shadow-sm"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <button onClick={toggleSidebar} className="p-2 rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#db991e]">
              <Menu size={24} />
            </button>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#db991e]">
              <Bell size={20} />
            </button>
            <SignedIn>
              <UserButton/>
            </SignedIn>
          </div>
        </div>
      </div>
    </motion.nav>
  )
}