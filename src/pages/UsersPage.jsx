import React from 'react'
import DefaultSidebar from '../components/DefaultSidebar';
import ListUsers from '../components/ListUsers';

const UsersPage = () => {
    return (
        <div className="flex h-screen">
          {/* Sidebar takes up a fixed height */}
          <div>
            <DefaultSidebar />
          </div>
          
          {/* Dashboard fills the remaining space and is scrollable */}
          <div className="flex-1 p-6 overflow-auto dark:bg-gray-900">
            <ListUsers />
          </div>
        </div>
      );
    };
    

export default UsersPage