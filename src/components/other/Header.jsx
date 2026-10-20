import React from 'react';

const Header = ({ data }) => {
  const logoutUser = () => {
    localStorage.removeItem("loggedInUser");
    window.location.reload();
  };

  const name = data?.firstName || 'User';

  return (
    <div className="flex items-center justify-between bg-gray-900 border border-gray-800 p-4 sm:p-5 rounded-xl">
      <h1 className="text-white text-lg sm:text-xl md:text-2xl font-semibold">
        Hello, <br />
        <span className="text-xl sm:text-2xl md:text-3xl font-bold text-emerald-400">
          {name} 👋
        </span>
      </h1>

      <button
        onClick={logoutUser}
        className="bg-red-600 hover:bg-red-700 text-white px-4 sm:px-5 py-2 rounded-lg text-sm sm:text-base font-medium transition cursor-pointer"
      >
        Logout
      </button>
    </div>
  );
};

export default Header;