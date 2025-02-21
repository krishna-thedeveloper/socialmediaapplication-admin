import React, { useEffect, useState } from 'react';

const Reports = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    fetch('/api/admin/reports', { credentials: 'include' })
      .then(res => res.json())
      .then(data => setReports(data))
      .catch(err => console.error(err));
  }, []);

  const handleAction = (id, action) => {
    fetch(`/api/admin/reports/${id}`, {
      method: 'PUT',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action }),
    })
      .then(() => setReports(reports.filter(report => report._id !== id)))
      .catch(err => console.error(err));
  };

  return (
    <div className="ml-64 p-5">
      <h1 className="text-3xl font-bold">Reports</h1>
      <table className="w-full mt-5 border">
        <thead>
          <tr className="bg-gray-800 text-white">
            <th className="p-3">Reported Post</th>
            <th className="p-3">Reported By</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {reports.map(report => (
            <tr key={report._id} className="border-b">
              <td className="p-3">{report.post?.text}</td>
              <td className="p-3">{report.reportedBy?.username}</td>
              <td className="p-3">
                <button onClick={() => handleAction(report._id, 'delete')} className="bg-red-500 text-white px-3 py-1 rounded">Delete Post</button>
                <button onClick={() => handleAction(report._id, 'ignore')} className="bg-gray-500 text-white px-3 py-1 ml-2 rounded">Ignore</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Reports;
