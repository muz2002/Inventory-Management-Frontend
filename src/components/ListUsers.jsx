import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

const ListUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/users/list-users')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setUsers(data);
      })
      .catch(error => console.error('Error fetching users:', error));
  }, []);

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
                    <button className="text-blue-600 dark:text-blue-300 hover:text-blue-800 flex items-center">
                      <FaEdit className="mr-1" /> Edit
                    </button>
                    <button className="text-red-600 hover:text-red-800 flex items-center">
                      <FaTrash className="mr-1" /> Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListUsers;
