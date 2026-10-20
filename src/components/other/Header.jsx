import React from 'react';

const Header = ({ data }) => {
  const logoutUser = () => {
    localStorage.removeItem("loggedInUser");
    window.location.reload();
  };

  const name = data?.firstName || 'User';
  const initial = name.charAt(0).toUpperCase();

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  });

  return (
    <header className="bg-gray-900/70 backdrop-blur-md border border-gray-800/80 rounded-2xl p-4 sm:p-5 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
      {/* Left: Brand + User Info */}
      <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto">
        <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-lg sm:text-xl shadow-lg shadow-indigo-500/25 shrink-0">
          {initial}
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-white text-lg sm:text-xl font-bold tracking-tight">
              Hello, {name} 👋
            </h1>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wider uppercase bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              Active
            </span>
          </div>
          <p className="text-gray-400 text-xs mt-0.5">
            📅 {today} • Welcome to your dashboard
          </p>
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto">
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gray-950/60 border border-gray-800 text-xs text-gray-400">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>System Online</span>
        </div>

        <button
          onClick={logoutUser}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-rose-300 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 active:scale-95 transition-all duration-200 cursor-pointer shadow-sm ml-auto sm:ml-0"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;