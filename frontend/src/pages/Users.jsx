import React, { useEffect, useState } from 'react';

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5001'+'/api/admin/users', { credentials: 'include' })
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="ml-64 p-5">
      <h1 className="text-3xl font-bold">Users</h1>
      <table className="w-full mt-5 border">
        <thead>
          <tr className="bg-gray-800 text-white">
            <th className="p-3">Username</th>
            <th className="p-3">Email</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id} className="border-b">
              <td className="p-3">{user.username}</td>
              <td className="p-3">{user.email}</td>
              <td className="p-3">
                <button className="bg-red-500 text-white px-3 py-1 rounded">Ban</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;