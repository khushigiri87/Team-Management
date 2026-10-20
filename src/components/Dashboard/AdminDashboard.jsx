import React from 'react';
import Header from '../other/Header';
import CreateTask from '../other/CreateTask';
import AllTask from '../other/AllTask';

const AdminDashboard = ({ data }) => {
  return (
    <div className="min-h-screen w-full bg-[#0B0F19] text-gray-100 p-4 sm:p-6 md:p-10">
      <div className="max-w-7xl mx-auto space-y-2">
        <Header data={data} />
        <CreateTask />
        <AllTask />
      </div>
    </div>
  );
};

export default AdminDashboard;