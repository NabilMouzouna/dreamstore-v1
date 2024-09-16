import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { DollarSign, Users, ShoppingBag, TrendingUp } from 'lucide-react'

const salesData = [
  { name: 'Jan', sales: 4000 },
  { name: 'Feb', sales: 3000 },
  { name: 'Mar', sales: 5000 },
  { name: 'Apr', sales: 4500 },
  { name: 'May', sales: 6000 },
  { name: 'Jun', sales: 5500 },
]

const userGrowthData = [
  { name: 'Jan', users: 100 },
  { name: 'Feb', users: 150 },
  { name: 'Mar', users: 200 },
  { name: 'Apr', users: 180 },
  { name: 'May', users: 250 },
  { name: 'Jun', users: 300 },
]

export default function DashboardHome() {
  const [animatedSales, setAnimatedSales] = useState(0)
  const [animatedUsers, setAnimatedUsers] = useState(0)
  const [animatedOrders, setAnimatedOrders] = useState(0)
  const [animatedGrowth, setAnimatedGrowth] = useState(0)

  useEffect(() => {
    const salesInterval = setInterval(() => {
      setAnimatedSales(prev => Math.min(prev + 100, 25000))
    }, 20)

    const usersInterval = setInterval(() => {
      setAnimatedUsers(prev => Math.min(prev + 1, 500))
    }, 20)

    const ordersInterval = setInterval(() => {
      setAnimatedOrders(prev => Math.min(prev + 1, 150))
    }, 20)

    const growthInterval = setInterval(() => {
      setAnimatedGrowth(prev => Math.min(prev + 0.1, 15))
    }, 20)

    return () => {
      clearInterval(salesInterval)
      clearInterval(usersInterval)
      clearInterval(ordersInterval)
      clearInterval(growthInterval)
    }
  }, [])

  return (
    <div className="space-y-6">
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <StatCard icon={DollarSign} title="Total Sales" value={`$${animatedSales.toLocaleString()}`} />
        <StatCard icon={Users} title="Total Users" value={animatedUsers.toLocaleString()} />
        <StatCard icon={ShoppingBag} title="Total Orders" value={animatedOrders.toLocaleString()} />
        <StatCard icon={TrendingUp} title="Growth" value={`${animatedGrowth.toFixed(1)}%`} />
      </motion.div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div 
          className="bg-white p-6 rounded-lg shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Monthly Sales</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="sales" fill="#db991e" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
        <motion.div 
          className="bg-white p-6 rounded-lg shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <h2 className="text-xl font-semibold mb-4 text-gray-800">User Growth</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={userGrowthData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="users" stroke="#db991e" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </div>
  )
}
//@ts-ignore
function StatCard({ icon: Icon, title, value }) {
  return (
    <motion.div 
      className="bg-white p-6 rounded-lg shadow-sm"
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex items-center">
        <div className="p-3 rounded-full bg-[#db991e] bg-opacity-10 text-[#db991e]">
          <Icon size={24} />
        </div>
        <div className="ml-4">
          <h3 className="text-sm font-medium text-gray-500">{title}</h3>
          <p className="text-2xl font-semibold text-gray-900">{value}</p>
        </div>
      </div>
    </motion.div>
  )
}