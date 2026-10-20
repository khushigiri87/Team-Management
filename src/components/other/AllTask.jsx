import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

const AllTask = () => {
  const [userData, setuserData] = useContext(AuthContext);

  const handleDeleteEmployee = (id, firstName) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete employee "${firstName}"? They will be removed and will no longer be able to log in.`);
    if (!confirmDelete) return;

    const currentEmployees = userData || JSON.parse(localStorage.getItem('employees')) || [];
    const updated = currentEmployees.filter((emp) => emp.id !== id);

    setuserData(updated);
    localStorage.setItem('employees', JSON.stringify(updated));

    // If this employee was currently saved as logged in session, remove it
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (loggedInUser && loggedInUser.data && (loggedInUser.data.id === id || loggedInUser.data.firstName === firstName)) {
      localStorage.removeItem('loggedInUser');
    }
  };

  return (
    <div className="mt-8 bg-gray-900 border border-gray-800 rounded-xl p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-white">
          All Employees
        </h2>
        <span className="text-xs text-gray-400">
          Total: {userData?.length || 0}
        </span>
      </div>

      <div className="grid grid-cols-6 text-gray-400 text-xs uppercase tracking-wider font-semibold px-4 py-3 bg-gray-800 rounded-lg mb-2">
        <span className="col-span-2 sm:col-span-1">Employee</span>
        <span className="text-center text-blue-400">New</span>
        <span className="text-center text-yellow-400">Active</span>
        <span className="text-center text-green-400">Done</span>
        <span className="text-center text-red-400">Failed</span>
        <span className="text-right">Action</span>
      </div>

      <div className="space-y-2 max-h-[300px] overflow-y-auto">
        {userData && userData.length > 0 ? (
          userData.map((elem) => (
            <div
              key={elem.id}
              className="grid grid-cols-6 items-center px-4 py-3 bg-gray-800/60 border border-gray-700/60 rounded-lg"
            >
              <div className="col-span-2 sm:col-span-1 truncate">
                <h3 className="text-white font-medium text-sm truncate">
                  {elem.firstName}
                </h3>
                <p className="text-gray-400 text-[11px] truncate">
                  {elem.email}
                </p>
              </div>

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

              <div className="text-right">
                <button
                  onClick={() => handleDeleteEmployee(elem.id, elem.firstName)}
                  className="px-2.5 py-1 bg-red-600/80 hover:bg-red-600 text-white text-xs font-medium rounded transition cursor-pointer"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-6 text-gray-400 text-sm">
            No employees found.
          </div>
        )}
      </div>
    </div>
  );
};

export default AllTask;