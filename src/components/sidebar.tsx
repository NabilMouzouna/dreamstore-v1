import { motion } from 'framer-motion'
import { Home, Package, Users, ShoppingCart, X } from 'lucide-react'

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
  setActiveTab: (tab: string) => void;
}

export default function Sidebar({ isOpen, toggleSidebar, setActiveTab }: SidebarProps) {
  const navItems = [
    { name: 'Dashboard', icon: Home, tab: 'dashboard' },
    { name: 'Products', icon: Package, tab: 'products' },
    { name: 'Users', icon: Users, tab: 'users' },
    { name: 'Orders', icon: ShoppingCart, tab: 'orders' },
  ]

  const sidebarVariants = {
    open: { x: 0 },
    closed: { x: '-100%' },
  }

  return (
    <motion.div 
      className="bg-white text-gray-800 w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform z-20 shadow-lg"
      initial="closed"
      animate="open"
      exit="closed"
      variants={sidebarVariants}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between px-4">
        <span className="text-2xl font-semibold text-[#db991e]">DreamStore</span>
        <button onClick={toggleSidebar} className="text-gray-500 hover:text-gray-800">
          <X size={24} />
        </button>
      </div>
      <nav className="space-y-2">
        {navItems.map((item) => (
          <motion.a
            key={item.name}
            href="#"
            className="flex items-center space-x-2 px-4 py-2.5 rounded transition duration-200 hover:bg-gray-100 hover:text-[#db991e]"
            onClick={() => setActiveTab(item.tab)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <item.icon size={20} />
            <span>{item.name}</span>
          </motion.a>
        ))}
      </nav>
    </motion.div>
  )
}