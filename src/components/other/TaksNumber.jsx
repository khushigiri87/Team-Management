import React from 'react';

const TaskNumber = ({ data }) => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 mt-6">
      <div className="rounded-xl p-5 bg-blue-600 text-white shadow">
        <h2 className="text-3xl sm:text-4xl font-bold">
          {data?.taskStats?.newTask || 0}
        </h2>
        <h3 className="text-sm sm:text-base font-medium mt-1">
          New Tasks
        </h3>
      </div>

      <div className="rounded-xl p-5 bg-emerald-600 text-white shadow">
        <h2 className="text-3xl sm:text-4xl font-bold">
          {data?.taskStats?.completed || 0}
        </h2>
        <h3 className="text-sm sm:text-base font-medium mt-1">
          Completed Tasks
        </h3>
      </div>

      <div className="rounded-xl p-5 bg-yellow-500 text-white shadow">
        <h2 className="text-3xl sm:text-4xl font-bold">
          {data?.taskStats?.active || 0}
        </h2>
        <h3 className="text-sm sm:text-base font-medium mt-1">
          Active Tasks
        </h3>
      </div>

      <div className="rounded-xl p-5 bg-red-600 text-white shadow">
        <h2 className="text-3xl sm:text-4xl font-bold">
          {data?.taskStats?.failed || 0}
        </h2>
        <h3 className="text-sm sm:text-base font-medium mt-1">
          Failed Tasks
        </h3>
      </div>
    </div>
  );
};

export default TaskNumber;