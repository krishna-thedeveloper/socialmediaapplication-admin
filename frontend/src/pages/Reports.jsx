import React, { useEffect, useState } from 'react';

const Reports = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5001/api/admin/reports', { credentials: 'include' })
      .then(res => res.json())
      .then(data =>{setReports(data); console.log(data)} )
      .catch(err => console.error(err));
  }, []);

  const handleAction = (id, action) => {
    fetch(`http://localhost:5001/api/admin/reports/${id}`, {
      method: 'PUT',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action }),
    })
      .then(() => setReports(reports.filter(report => report._id !== id)))
      .catch(err => console.error(err));
  };

  return (
    <div className="ml-64 p-6 text-white">
      <h1 className="text-3xl font-bold mb-6">Reports</h1>

      <div className="bg-gray-800 p-5 rounded-lg shadow-lg">
        <table className="w-full border border-gray-700">
          <thead>
            <tr className="bg-gray-700 text-white">
              <th className="p-3 text-left">Reported Post</th>
              <th className="p-3 text-left">Reported By</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {reports.length > 0 ? (
              reports.map(report => (
                <tr key={report._id} className="border-b border-gray-600">
                  <td className="p-3">{report.reportedPost?.text || "Post Deleted"}</td>
                  <td className="p-3">{report.reportedBy?.username || "Unknown"}</td>
                  <td className="p-3 text-center">
                    <button
                      onClick={() => handleAction(report._id, 'delete')}
                      className="bg-red-500 text-white px-3 py-1 rounded mr-2"
                    >
                      Delete Post
                    </button>
                    <button
                      onClick={() => handleAction(report._id, 'ignore')}
                      className="bg-gray-500 text-white px-3 py-1 rounded"
                    >
                      Ignore
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="p-5 text-center text-gray-400">No reports found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Reports;
