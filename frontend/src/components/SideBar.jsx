import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-gray-900 text-white fixed flex flex-col">
      <h2 className="text-2xl font-bold p-5">Admin Panel</h2>
      <nav className="flex flex-col gap-4 p-5">
        <Link to="/" className="hover:bg-gray-700 p-2 rounded">Dashboard</Link>
        <Link to="/users" className="hover:bg-gray-700 p-2 rounded">Users</Link>
        <Link to="/posts" className="hover:bg-gray-700 p-2 rounded">Posts</Link>
        <Link to="/reports" className="hover:bg-gray-700 p-2 rounded">Reports</Link>
      </nav>
    </div>
  );
};

export default Sidebar;