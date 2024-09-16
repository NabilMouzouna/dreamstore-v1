"use client"
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Sidebar from '@/components/sidebar'
import Navbar from '@/components/dashboard-nav'
import DashboardHome from '@/components/dashboard-home'
import ProductManagement from '@/components/product-management'
import UserManagement from '@/components/user-management'
import OrderManagement from '@/components/orders-management'

export default function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [activeTab, setActiveTab] = useState('dashboard')

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen)

  return (
    <div className="flex h-screen bg-gray-50">
      <AnimatePresence>
        {isSidebarOpen && (
          <Sidebar 
            isOpen={isSidebarOpen} 
            toggleSidebar={toggleSidebar} 
            setActiveTab={setActiveTab} 
          />
        )}
      </AnimatePresence>
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar toggleSidebar={toggleSidebar} />
        <motion.main 
          className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'dashboard' && <DashboardHome />}
          {activeTab === 'products' && <ProductManagement />}
          {activeTab === 'users' && <UserManagement />}
          {activeTab === 'orders' && <OrderManagement />}
        </motion.main>
      </div>
    </div>
  )
}