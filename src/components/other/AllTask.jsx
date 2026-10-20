import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

const AllTask = () => {
  const [userData] = useContext(AuthContext);

  return (
    <div className="mt-8 bg-gray-900 border border-gray-800 rounded-xl p-5">
      <h2 className="text-xl font-bold text-white mb-4">
        All Employees
      </h2>

      <div className="grid grid-cols-5 text-gray-400 text-xs uppercase tracking-wider font-semibold px-4 py-3 bg-gray-800 rounded-lg mb-2">
        <span>Employee</span>
        <span className="text-center text-blue-400">New Task</span>
        <span className="text-center text-yellow-400">Active Task</span>
        <span className="text-center text-green-400">Completed</span>
        <span className="text-center text-red-400">Failed</span>
      </div>

      <div className="space-y-2 max-h-[300px] overflow-y-auto">
        {userData?.map((elem) => (
          <div
            key={elem.id}
            className="grid grid-cols-5 items-center px-4 py-3 bg-gray-800/60 border border-gray-700/60 rounded-lg"
          >
            <h3 className="text-white font-medium text-sm truncate">
              {elem.firstName}
            </h3>
            <span className="text-center text-blue-400 font-semibold text-sm">
              {elem.taskStats?.newTask || 0}
            </span>
            <span className="text-center text-yellow-400 font-semibold text-sm">
              {elem.taskStats?.active || 0}
            </span>
            <span className="text-center text-green-400 font-semibold text-sm">
              {elem.taskStats?.completed || 0}
            </span>
            <span className="text-center text-red-400 font-semibold text-sm">
              {elem.taskStats?.failed || 0}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllTask;