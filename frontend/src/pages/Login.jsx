import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const navigate = useNavigate();

const handleLogin = async (e) => {
e.preventDefault();
const response = await fetch('/api/admin/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  credentials: 'include',
  body: JSON.stringify({ email, password }),
});

if (response.ok) {
  navigate('/');
} else {
  alert('Invalid credentials');
}
};

return (
<div className="flex items-center justify-center h-screen bg-gray-100">
  <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow-md w-96">
    <h2 className="text-2xl font-bold mb-4">Admin Login</h2>
    <input 
      type="email" 
      placeholder="Email" 
      value={email} 
      onChange={(e) => setEmail(e.target.value)}
      className="w-full p-2 border rounded mb-4"
      required
    />
    <input 
      type="password" 
      placeholder="Password" 
      value={password} 
      onChange={(e) => setPassword(e.target.value)}
      className="w-full p-2 border rounded mb-4"
      required
    />
    <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Login</button>
  </form>
</div>
);
};

export default Login;