import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Pencil, Trash2 } from 'lucide-react'

export default function UserManagement() {
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'User' },
  ])

  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'User' })
//@ts-ignore
  const handleAddUser = (e) => {
    e.preventDefault()
    const id = users.length + 1
    setUsers([...users, { id, ...newUser }])
    setNewUser({ name: '', email: '', role: 'User' })
  }
//@ts-ignore
  const handleDeleteUser = (id) => {
    setUsers(users.filter(user => user.id !== id))
  }

  return (
    <motion.div 
      className="bg-white shadow-sm rounded-lg p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">User Management</h2>
      <form onSubmit={handleAddUser} className="mb-6 flex space-x-4">
        <input
          type="text"
          placeholder="Name"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          className="flex-1 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#db991e]"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          className="flex-1 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#db991e]"
          required
        />
        <select
          value={newUser.role}
          onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
          className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#db991e]"
        >
          <option value="User">User</option>
          <option value="Admin">Admin</option>
        </select>
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
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <motion.tr 
                key={user.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.role}</td>
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
                    onClick={() => handleDeleteUser(user.id)}
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