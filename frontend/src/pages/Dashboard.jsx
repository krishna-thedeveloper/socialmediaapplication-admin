import React, { useEffect, useState } from 'react';

const Dashboard = () => {
  const [stats, setStats] = useState({ totalUsers: 0, totalPosts: 0, totalReports: 0 });

  useEffect(() => {
    fetch('/api/admin/dashboard', { credentials: 'include' })
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="ml-64 p-5">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <div className="grid grid-cols-3 gap-4 mt-5">
        <div className="bg-blue-500 text-white p-5 rounded shadow-lg">
          <h2 className="text-xl">Total Users</h2>
          <p className="text-2xl font-bold">{stats.totalUsers}</p>
        </div>
        <div className="bg-green-500 text-white p-5 rounded shadow-lg">
          <h2 className="text-xl">Total Posts</h2>
          <p className="text-2xl font-bold">{stats.totalPosts}</p>
        </div>
        <div className="bg-red-500 text-white p-5 rounded shadow-lg">
          <h2 className="text-xl">Total Reports</h2>
          <p className="text-2xl font-bold">{stats.totalReports}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;