import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Dialog, DialogHeader, DialogBody, DialogFooter, Button, Input } from "@material-tailwind/react";

const ListUsers = () => {
  const [users, setUsers] = useState([]);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState({ id: '', name: '', email: '' });

  useEffect(() => {
    fetch('http://localhost:8080/users/list-users')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setUsers(data);
      })
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  const deleteUser = (userId) => {
    fetch(`http://localhost:8080/${userId}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.ok) {
          setUsers(users.filter(user => user.id !== userId));
        } else {
          console.error('Failed to delete user');
        }
      })
      .catch(error => console.error('Error deleting user:', error));
  };

  const openEditModal = (user) => {
    setSelectedUser(user);
    setIsEditOpen(true);
  };

  const closeEditModal = () => {
    setIsEditOpen(false);
    setSelectedUser({ id: '', name: '', email: '' });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setSelectedUser(prev => ({ ...prev, [name]: value }));
  };

  const submitEdit = () => {
    fetch(`http://localhost:8080/update-user/${selectedUser.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(selectedUser),
    })
      .then(response => {
        if (response.ok) {
          setUsers(users.map(user => user.id === selectedUser.id ? selectedUser : user));
          closeEditModal();
        } else {
          console.error('Failed to update user');
        }
      })
      .catch(error => console.error('Error updating user:', error));
  };

  return (
    <div className="bg-white shadow rounded-lg p-6 dark:bg-gray-600">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Users</h1>
        <div className="flex space-x-3">
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-400">+ Add user</button>
          <button className="border border-gray-300 px-4 py-2 dark:text-white rounded-md hover:bg-gray-100">Export</button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="text-gray-500 dark:text-gray-400 border-b dark:border-gray-700">
              <th className="pb-3">Name</th>
              <th className="pb-3">Username</th>
              <th className="pb-3">Email</th>
              <th className="pb-3">Country</th>
              <th className="pb-3">Position</th>
              <th className="pb-3">Status</th>
              <th className="pb-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id} className="border-b dark:border-gray-700">
                <td className="py-4 text-gray-800 dark:text-white">{user.name}</td>
                <td className="py-4 text-gray-800 dark:text-white">{user.username}</td>
                <td className="py-4 text-gray-800 dark:text-white">{user.email}</td>
                <td className="py-4 text-gray-800 dark:text-white">
                  {user.country ? user.country.countryName : 'N/A'}
                </td>
                <td className="py-4 text-gray-800 dark:text-white">
                  {user.position || 'N/A'}
                </td>
                <td className="py-4 text-gray-800 dark:text-white">
                  {user.status || 'N/A'}
                </td>
                <td className="py-4">
                  <div className="flex space-x-4">
                    <button
                      onClick={() => openEditModal(user)}
                      className="text-blue-500 hover:text-blue-700 mr-3"
                    > 
                      <FaEdit className='cursor-pointer' />
                    </button>
                    <button
                      onClick={() => deleteUser(user.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaTrash 
                          className="text-red-500 cursor-pointer"
                          onClick={() => deleteUser(user.id)} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isEditOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50"
        >
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Edit User</h2>
              <button onClick={closeEditModal} className="text-gray-600 hover:text-gray-800">
                ×
              </button>
            </div>
            <form onSubmit={submitEdit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Name</label>
                <input
                  type="text"
                  name="name"
                  value={selectedUser.name}
                  onChange={handleEditChange}
                  className="mt-1 w-full border rounded px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  value={selectedUser.email}
                  onChange={handleEditChange}
                  className="mt-1 w-full border rounded px-3 py-2"
                  required
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={closeEditModal}
                  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
        
      )}
    </div>
  );
};


export default ListUsers;
