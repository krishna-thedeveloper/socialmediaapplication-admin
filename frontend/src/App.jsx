import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import Posts from './pages/Posts';
import Reports from './pages/Reports';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import Sidebar from './components/SideBar';


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    fetch('http://localhost:5001'+'/api/auth/checkAuth', { credentials: 'include' })
      .then(res => res.json())
      .then(data => setIsAuthenticated(data.isAuthenticated))
      .catch(() => setIsAuthenticated(false));
  }, []);

  return (
    <Router>
      <div className="flex">
        {isAuthenticated && <Sidebar />}
        <div className={isAuthenticated ? "flex-1 ml-64" : "flex-1"}>
          {isAuthenticated && <Navbar />}
          <Routes>
            <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
            <Route path="/" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
            <Route path="/users" element={isAuthenticated ? <Users /> : <Navigate to="/login" />} />
            <Route path="/posts" element={isAuthenticated ? <Posts /> : <Navigate to="/login" />} />
            <Route path="/reports" element={isAuthenticated ? <Reports /> : <Navigate to="/login" />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;