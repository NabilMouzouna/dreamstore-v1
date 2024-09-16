import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, X, Pencil, Trash2, Search, AlertTriangle } from 'lucide-react'

interface Variant {
  [key: string]: string | number;
}

interface ProductVariants {
  color: Variant[];
  capacity: Variant[];
}

interface Product {
  id: number;
  productName: string;
  category: string;
  productDesc: string;
  productPrev: string;
  fixedPrice: number;
  variants: ProductVariants;
}

const placeholderProducts: Product[] = [
  {
    id: 1,
    productName: "Galaxy S24 Ultra",
    category: "smartphone",
    productDesc: "Obtenez un étui smart view avec porte-carte et un double chargeur sans fil rapide 15W à l'achat du Galaxy S24 Ultra",
    productPrev: "https://images.samsung.com/is/image/samsung/assets/n_africa/smartphones/socialimage/S24Ultra_448x298.jpg?$ORIGIN_JPG$",
    fixedPrice: 18990.00,
    variants: {
      color: [
        { TitaniumGray: "#797982", priceAded: 0 },
        { TitaniumBlack: "#54544e", priceAded: 0 },
        { TitaniumViolet: "#888586", priceAded: 0 },
        { TitaniumYellow: "#EEE600", priceAded: 0 }
      ],
      capacity: [
        { "256Go｜12Go": -2000 },
        { "512Go｜12Go": 0 },
        { "1Tb｜12Go": 2000 }
      ]
    }
  },
  {
    id: 2,
    productName: "iPhone 15 Pro",
    category: "smartphone",
    productDesc: "A17 Pro chip. Titanium design. Action button. 48MP Main camera.",
    productPrev: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-model-unselect-gallery-2-202309?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1693010535312",
    fixedPrice: 17990.00,
    variants: {
      color: [
        { NaturalTitanium: "#9E9E9F", priceAded: 0 },
        { BlueTitanium: "#39517A", priceAded: 0 },
        { WhiteTitanium: "#F0F2F2", priceAded: 0 },
        { BlackTitanium: "#4D4D4D", priceAded: 0 }
      ],
      capacity: [
        { "128GB": -1000 },
        { "256GB": 0 },
        { "512GB": 2000 },
        { "1TB": 4000 }
      ]
    }
  }
]

export default function ProductManagement() {
  const [products, setProducts] = useState<Product[]>(placeholderProducts)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [productToDelete, setProductToDelete] = useState<number | null>(null)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [newProduct, setNewProduct] = useState<Product>({
    id: 0,
    productName: '',
    category: '',
    productDesc: '',
    productPrev: '',
    fixedPrice: 0,
    variants: {
      color: [],
      capacity: []
    }
  })

  const handleAddOrUpdateProduct = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingProduct) {
      setProducts(products.map(p => p.id === editingProduct.id ? { ...newProduct, id: editingProduct.id } : p))
    } else {
      setProducts([...products, { ...newProduct, id: products.length + 1 }])
    }
    setNewProduct({
      id: 0,
      productName: '',
      category: '',
      productDesc: '',
      productPrev: '',
      fixedPrice: 0,
      variants: {
        color: [],
        capacity: []
      }
    })
    setEditingProduct(null)
    setIsModalOpen(false)
  }

  const handleDeleteProduct = (id: number) => {
    setProductToDelete(id)
    setIsDeleteModalOpen(true)
  }

  const confirmDeleteProduct = () => {
    if (productToDelete) {
      setProducts(products.filter(product => product.id !== productToDelete))
    }
    setIsDeleteModalOpen(false)
    setProductToDelete(null)
  }

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product)
    setNewProduct({ ...product })
    setIsModalOpen(true)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setNewProduct({ ...newProduct, [name]: name === 'fixedPrice' ? parseFloat(value) : value })
  }

  const handleVariantChange = (type: 'color' | 'capacity', index: number, key: string, value: string) => {
    const updatedVariants = { ...newProduct.variants }
    updatedVariants[type][index] = { ...updatedVariants[type][index], [key]: value }
    setNewProduct({ ...newProduct, variants: updatedVariants })
  }

  const addVariant = (type: 'color' | 'capacity') => {
    const updatedVariants = { ...newProduct.variants }
    if (type === 'color') {
      updatedVariants.color.push({ name: '', value: '', priceAded: 0 })
    } else {
      updatedVariants.capacity.push({ name: '', priceAded: 0 })
    }
    setNewProduct({ ...newProduct, variants: updatedVariants })
  }

  const removeVariant = (type: 'color' | 'capacity', index: number) => {
    const updatedVariants = { ...newProduct.variants }
    updatedVariants[type] = updatedVariants[type].filter((_, i) => i !== index)
    setNewProduct({ ...newProduct, variants: updatedVariants })
  }

  return (
    <motion.div 
      className="bg-white shadow-sm rounded-lg p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Product Management</h2>
        <motion.button 
          onClick={() => {
            setEditingProduct(null)
            setNewProduct({
              id: 0,
              productName: '',
              category: '',
              productDesc: '',
              productPrev: '',
              fixedPrice: 0,
              variants: {
                color: [],
                capacity: []
              }
            })
            setIsModalOpen(true)
          }}
          className="bg-[#db991e] text-white px-4 py-2 rounded-full hover:bg-[#c78a1b] transition-colors duration-200 flex items-center"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Plus size={20} />
          <span className="ml-2">Add Product</span>
        </motion.button>
      </div>

      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#db991e] focus:border-transparent"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <motion.div 
            key={product.id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <img src={product.productPrev} alt={product.productName} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{product.productName}</h3>
              <p className="text-sm text-gray-600 mb-2">{product.category}</p>
              <p className="text-lg font-bold text-[#db991e] mb-2">${product.fixedPrice.toFixed(2)}</p>
              <p className="text-sm text-gray-700 mb-4 line-clamp-2">{product.productDesc}</p>
              <div className="flex justify-between items-center">
                <motion.button 
                  className="text-blue-600 hover:text-blue-800"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleEditProduct(product)}
                >
                  <Pencil size={18} />
                </motion.button>
                <motion.button 
                  className="text-red-600 hover:text-red-800" 
                  onClick={() => handleDeleteProduct(product.id)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Trash2 size={18} />
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">{editingProduct ? 'Edit Product' : 'Add New Product'}</h3>
                <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                  <X size={24} />
                </button>
              </div>
              <form onSubmit={handleAddOrUpdateProduct} className="space-y-4">
                <div>
                  <label htmlFor="productName" className="block text-sm font-medium text-gray-700">Product Name</label>
                  <input
                    type="text"
                    id="productName"
                    name="productName"
                    value={newProduct.productName}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-[#db991e] focus:border-[#db991e]"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
                  <input
                    type="text"
                    id="category"
                    name="category"
                    value={newProduct.category}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-[#db991e] focus:border-[#db991e]"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="productDesc" className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    id="productDesc"
                    name="productDesc"
                    value={newProduct.productDesc}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-[#db991e] focus:border-[#db991e]"
                    rows={3}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="productPrev" className="block text-sm font-medium text-gray-700">Preview Image URL</label>
                  <input
                    type="url"
                    id="productPrev"
                    name="productPrev"
                    value={newProduct.productPrev}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-[#db991e] focus:border-[#db991e]"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="fixedPrice" className="block text-sm font-medium text-gray-700">Fixed Price</label>
                  <input
                    type="number"
                    id="fixedPrice"
                    name="fixedPrice"
                    value={newProduct.fixedPrice}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-[#db991e] focus:border-[#db991e]"
                    required
                  />
                </div>
                <div>
                  <h4 className="text-lg font-medium text-gray-700 mb-2">Color Variants</h4>
                  {newProduct.variants.color.map((color, index) => (
                    <div key={index} className="flex space-x-2 mb-2">
                      <input
                        type="text"
                        placeholder="Color Name"
                        value={Object.keys(color)[0] || ''}
                        onChange={(e) => handleVariantChange('color', index, e.target.value, Object.values(color)[0] as string)}
                        className="flex-1 border border-gray-300 rounded-md shadow-sm p-2 focus:ring-[#db991e] focus:border-[#db991e]"
                      />
                      <input
                        type="text"
                        placeholder="Color Value"
                        value={Object.values(color)[0] as string || ''}
                        onChange={(e) => handleVariantChange('color', index, Object.keys(color)[0], e.target.value)}
                        className="flex-1 border border-gray-300 rounded-md shadow-sm p-2 focus:ring-[#db991e] focus:border-[#db991e]"
                      />
                      <input
                        type="number"
                        placeholder="Price Added"
                        value={color.priceAded as number}
                        onChange={(e) => handleVariantChange('color', index, 'priceAded', e.target.value)}
                        className="w-24 border border-gray-300 rounded-md shadow-sm p-2 focus:ring-[#db991e] focus:border-[#db991e]"
                      />
                      <button
                        type="button"
                        onClick={() => removeVariant('color', index)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <X size={20} />
                      </button>
                    </div>
                  ))}
                  <button type="button" onClick={() => addVariant('color')} className="text-[#db991e] hover:text-[#c78a1b]">
                    + Add Color Variant
                  </button>
                </div>
                <div>
                  <h4 className="text-lg font-medium text-gray-700 mb-2">Capacity Variants</h4>
                  {newProduct.variants.capacity.map((capacity, index) => (
                    <div key={index} className="flex space-x-2 mb-2">
                      <input
                        type="text"
                        placeholder="Capacity"
                        value={Object.keys(capacity)[0] || ''}
                        onChange={(e) => handleVariantChange('capacity', index, e.target.value, '')}
                        className="flex-1 border border-gray-300 rounded-md shadow-sm p-2 focus:ring-[#db991e] focus:border-[#db991e]"
                      />
                      <input
                        type="number"
                        placeholder="Price Added"
                        value={capacity.priceAded as number}
                        onChange={(e) => handleVariantChange('capacity', index, 'priceAded', e.target.value)}
                        className="w-24 border border-gray-300 rounded-md shadow-sm p-2 focus:ring-[#db991e] focus:border-[#db991e]"
                      />
                      <button
                        type="button"
                        onClick={() => removeVariant('capacity', index)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <X size={20} />
                      </button>
                    </div>
                  ))}
                  <button type="button" onClick={() => addVariant('capacity')} className="text-[#db991e] hover:text-[#c78a1b]">
                    + Add Capacity Variant
                  </button>
                </div>
                <div className="flex justify-end space-x-2 mt-4">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#db991e] text-white rounded-md hover:bg-[#c78a1b]"
                  >
                    {editingProduct ? 'Update Product' : 'Add Product'}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isDeleteModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="bg-white rounded-lg p-6 w-full max-w-md"
            >
              <div className="flex items-center mb-4 text-red-600">
                <AlertTriangle size={24} className="mr-2" />
                <h3 className="text-xl font-semibold">Confirm Deletion</h3>
              </div>
              <p className="mb-4">Are you sure you want to delete this product? This action cannot be undone.</p>
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDeleteProduct}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}