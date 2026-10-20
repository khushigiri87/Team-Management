import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';

const AllTask = () => {
  const [userData] = useContext(AuthContext);
  const [search, setSearch] = useState('');

  const filteredEmployees = userData?.filter((emp) =>
    emp.firstName.toLowerCase().includes(search.toLowerCase()) ||
    emp.email.toLowerCase().includes(search.toLowerCase())
  ) || [];

  return (
    <div className="mt-8 bg-gray-900/70 backdrop-blur-md border border-gray-800/80 rounded-2xl p-5 sm:p-7 shadow-xl">
      {/* Header with Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 mb-5 border-b border-gray-800/80 gap-3">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <span>👥</span> Team Performance & Workload
          </h2>
          <p className="text-gray-400 text-xs sm:text-sm mt-0.5">
            Real-time breakdown of assigned tasks across all team members
          </p>
        </div>

        {/* Search Input */}
        <div className="relative min-w-[200px] sm:min-w-[260px]">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search employee..."
            className="w-full bg-gray-950/70 border border-gray-700/80 rounded-xl pl-9 pr-3 py-2 text-white placeholder-gray-500 text-xs sm:text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
          />
          <span className="absolute left-3 top-2.5 text-gray-500 text-xs">🔍</span>
        </div>
      </div>

      {/* Table Header */}
      <div className="grid grid-cols-6 text-gray-400 text-[10px] sm:text-xs uppercase tracking-wider font-semibold px-4 py-3 bg-gray-950/60 rounded-xl mb-3 border border-gray-800/60">
        <span className="col-span-2 sm:col-span-1">Member</span>
        <span className="text-center text-blue-400">New</span>
        <span className="text-center text-amber-400">Active</span>
        <span className="text-center text-emerald-400">Done</span>
        <span className="text-center text-rose-400">Failed</span>
        <span className="text-right hidden sm:block">Status</span>
      </div>

      {/* Rows */}
      <div className="space-y-2 max-h-[360px] overflow-y-auto pr-1">
        {filteredEmployees.length === 0 ? (
          <div className="text-center py-8 text-gray-500 text-sm">
            No team members found matching "{search}"
          </div>
        ) : (
          filteredEmployees.map((elem) => {
            const initial = elem.firstName.charAt(0).toUpperCase();
            return (
              <div
                key={elem.id}
                className="grid grid-cols-6 items-center px-4 py-3 bg-gray-900/60 hover:bg-gray-800/60 border border-gray-800 rounded-xl transition duration-200"
              >
                {/* Member avatar & name */}
                <div className="col-span-2 sm:col-span-1 flex items-center gap-2.5">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-xs shrink-0 shadow-sm">
                    {initial}
                  </div>
                  <div className="truncate">
                    <h3 className="text-white font-semibold text-xs sm:text-sm truncate">
                      {elem.firstName}
                    </h3>
                    <p className="text-gray-400 text-[10px] truncate hidden md:block">
                      {elem.email}
                    </p>
                  </div>
                </div>

                {/* New Tasks */}
                <div className="text-center">
                  <span className="inline-block px-2 sm:px-2.5 py-0.5 rounded-md text-xs font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                    {elem.taskStats?.newTask || 0}
                  </span>
                </div>

                {/* Active Tasks */}
                <div className="text-center">
                  <span className="inline-block px-2 sm:px-2.5 py-0.5 rounded-md text-xs font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    {elem.taskStats?.active || 0}
                  </span>
                </div>

                {/* Completed Tasks */}
                <div className="text-center">
                  <span className="inline-block px-2 sm:px-2.5 py-0.5 rounded-md text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    {elem.taskStats?.completed || 0}
                  </span>
                </div>

                {/* Failed Tasks */}
                <div className="text-center">
                  <span className="inline-block px-2 sm:px-2.5 py-0.5 rounded-md text-xs font-bold bg-rose-500/10 text-rose-400 border border-rose-500/20">
                    {elem.taskStats?.failed || 0}
                  </span>
                </div>

                {/* Status Badge */}
                <div className="text-right hidden sm:block">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-medium bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                    Ready
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default AllTask;