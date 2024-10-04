'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Trash2 } from "lucide-react"
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { AlertDialogTrigger } from '@radix-ui/react-alert-dialog'

interface Product {
  _id: string
  productName: string
  category: string
  productDesc: string
  productPrev: string
  fixedPrice: number
  variants: {
    color: Array<{ name: string; hexCode: string; priceAdded: number }>
    capacity: Array<{ type: string; priceAdded: number }>
  }
}

export default function ProductManagement() {
  const [products, setProducts] = useState<Product[]>([])
  const [newProduct, setNewProduct] = useState({
    productName: '',
    category: '',
    productDesc: '',
    productPrev: '',
    fixedPrice: 0,
    variants: {
      color: [{ name: '', hexCode: '', priceAdded: 0 }],
      capacity: [{ type: '', priceAdded: 0 }]
    }
  })
  const [productToDelete, setProductToDelete] = useState<string | null>(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [alertDialogOpen, setAlertDialogOpen] = useState(false)
  const [alertDialogContent, setAlertDialogContent] = useState({ title: '', description: '' })

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:8000/products/')
      if (!response.ok) throw new Error('Failed to fetch products')
      const data = await response.json()
      setProducts(data)
    } catch (error) {
      console.error('Error fetching products:', error)
      showAlert('Error', 'Failed to fetch products. Please try again.')
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewProduct(prev => ({ ...prev, [name]: name === 'fixedPrice' ? parseFloat(value) : value }))
  }

  const handleCreateProduct = async () => {
    try {
      const response = await fetch('http://localhost:8000/products/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduct)
      })
      if (!response.ok) throw new Error('Failed to create product')
      await fetchProducts()
      setNewProduct({
        productName: '',
        category: '',
        productDesc: '',
        productPrev: '',
        fixedPrice: 0,
        variants: {
          color: [{ name: '', hexCode: '', priceAdded: 0 }],
          capacity: [{ type: '', priceAdded: 0 }]
        }
      })
      setIsCreateDialogOpen(false)
      showAlert('Success', 'Product created successfully!')
    } catch (error) {
      console.error('Error creating product:', error)
      showAlert('Error', 'Failed to create product. Please try again.')
    }
  }

  const handleDeleteProduct = async () => {
    if (!productToDelete) return

    try {
      const response = await fetch(`http://localhost:8000/products/${productToDelete}`, {
        method: 'DELETE'
      })
      if (!response.ok) throw new Error('Failed to delete product')
      await fetchProducts()
      setIsDeleteDialogOpen(false)
      setProductToDelete(null)
      showAlert('Success', 'Product deleted successfully!')
    } catch (error) {
      console.error('Error deleting product:', error)
      showAlert('Error', 'Failed to delete product. Please try again.')
    }
  }

  const showAlert = (title: string, description: string) => {
    setAlertDialogContent({ title, description })
    setAlertDialogOpen(true)
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Product Management</h1>
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Create New Product</h2>
        <div className="grid grid-cols-2 gap-4">
          <Input
            name="productName"
            placeholder="Product Name"
            value={newProduct.productName}
            onChange={handleInputChange}
            aria-label="Product Name"
          />
          <Input
            name="category"
            placeholder="Category"
            value={newProduct.category}
            onChange={handleInputChange}
            aria-label="Category"
          />
          <Input
            name="productDesc"
            placeholder="Product Description"
            value={newProduct.productDesc}
            onChange={handleInputChange}
            aria-label="Product Description"
          />
          <Input
            name="productPrev"
            placeholder="Product Preview"
            value={newProduct.productPrev}
            onChange={handleInputChange}
            aria-label="Product Preview"
          />
          <Input
            name="fixedPrice"
            type="number"
            placeholder="Fixed Price"
            value={newProduct.fixedPrice}
            onChange={handleInputChange}
            aria-label="Fixed Price"
          />
        </div>
        <AlertDialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <Button className="mt-4" onClick={() => setIsCreateDialogOpen(true)}>Create Product</Button>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Create New Product</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to create this product?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleCreateProduct}>Create</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      
      <h2 className="text-xl font-semibold mb-2">Product List</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Product Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Fixed Price</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product._id}>
              <TableCell>{product.productName}</TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell>${product.fixedPrice.toFixed(2)}</TableCell>
              <TableCell>
                <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => setProductToDelete(product._id)}
                      aria-label={`Delete ${product.productName}`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Product</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to delete this product? This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={handleDeleteProduct}>Delete</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <AlertDialog open={alertDialogOpen} onOpenChange={setAlertDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{alertDialogContent.title}</AlertDialogTitle>
            <AlertDialogDescription>
              {alertDialogContent.description}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction>OK</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}