import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await fetch('http://localhost:3000'+'/api/auth/logout', { method: 'POST', credentials: 'include' });
    navigate('/login');
  };

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Admin Dashboard</h1>
      <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded">Logout</button>
    </nav>
  );
};

export default Navbar;
