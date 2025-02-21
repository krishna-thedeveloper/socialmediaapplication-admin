import React, { useEffect, useState } from 'react';

const Posts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('/api/admin/posts', { credentials: 'include' })
      .then(res => res.json())
      .then(data => setPosts(data))
      .catch(err => console.error(err));
  }, []);

  const handleDelete = (id) => {
    fetch(`/api/admin/posts/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    })
      .then(() => setPosts(posts.filter(post => post._id !== id)))
      .catch(err => console.error(err));
  };

  return (
    <div className="ml-64 p-5">
      <h1 className="text-3xl font-bold">Posts</h1>
      <table className="w-full mt-5 border">
        <thead>
          <tr className="bg-gray-800 text-white">
            <th className="p-3">Content</th>
            <th className="p-3">Author</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts.map(post => (
            <tr key={post._id} className="border-b">
              <td className="p-3">{post.text}</td>
              <td className="p-3">{post.user?.username}</td>
              <td className="p-3">
                <button onClick={() => handleDelete(post._id)} className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Posts;
