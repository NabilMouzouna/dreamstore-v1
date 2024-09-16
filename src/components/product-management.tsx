import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Pencil, Trash2 } from 'lucide-react'

export default function ProductManagement() {
  const [products, setProducts] = useState([
    { id: 1, name: 'Product 1', price: 19.99, stock: 100 },
    { id: 2, name: 'Product 2', price: 29.99, stock: 50 },
    { id: 3, name: 'Product 3', price: 39.99, stock: 75 },
  ])

  const [newProduct, setNewProduct] = useState({ name: '', price: '', stock: '' })
//@ts-ignore
  const handleAddProduct = (e) => {
    e.preventDefault()
    const id = products.length + 1
    setProducts([...products, { id, ...newProduct, price: parseFloat(newProduct.price), stock: parseInt(newProduct.stock) }])
    setNewProduct({ name: '', price: '', stock: '' })
  }
//@ts-ignore
  const handleDeleteProduct = (id) => {
    setProducts(products.filter(product => product.id !== id))
  }

  return (
    <motion.div 
      className="bg-white shadow-sm rounded-lg p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Product Management</h2>
      <form onSubmit={handleAddProduct} className="mb-6 flex space-x-4">
        <input
          type="text"
          placeholder="Product Name"
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
          className="flex-1 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#db991e]"
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
          className="w-24 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#db991e]"
          required
        />
        <input
          type="number"
          placeholder="Stock"
          value={newProduct.stock}
          onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
          className="w-24 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#db991e]"
          required
        />
        <motion.button 
          type="submit" 
          className="bg-[#db991e] text-white px-4 py-2 rounded hover:bg-[#c78a1b] transition-colors duration-200"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Plus size={20} />
        </motion.button>
      </form>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products.map((product) => (
              <motion.tr 
                key={product.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${product.price.toFixed(2)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.stock}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <motion.button 
                    className="text-indigo-600 hover:text-indigo-900 mr-2"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Pencil size={18} />
                  </motion.button>
                  <motion.button 
                    className="text-red-600 hover:text-red-900" 
                    onClick={() => handleDeleteProduct(product.id)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Trash2 size={18} />
                  </motion.button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  )
}