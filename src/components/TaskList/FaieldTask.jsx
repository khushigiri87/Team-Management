import React from "react";

const FailedTask = ({ data }) => {
  return (
    <div className="min-w-[280px] sm:min-w-[320px] max-w-[340px] flex-shrink-0 bg-gradient-to-br from-rose-900/40 via-red-900/30 to-gray-900/60 backdrop-blur-md rounded-2xl p-5 border border-rose-500/30 shadow-xl flex flex-col justify-between hover:-translate-y-1 transition-all duration-300">
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-rose-500/20 text-rose-300 border border-rose-500/30 uppercase tracking-wider">
            {data.category || 'General'}
          </span>
          <span className="text-xs text-gray-400 font-medium">
            📅 {data.date}
          </span>
        </div>

        <h3 className="text-lg font-bold text-white tracking-tight leading-snug">
          {data.title}
        </h3>

        <p className="mt-2.5 text-xs sm:text-sm text-gray-300 line-clamp-3 leading-relaxed">
          {data.description}
        </p>
      </div>

      <div className="mt-5 pt-4 border-t border-rose-500/20">
        <div className="w-full py-2 px-3 bg-rose-500/10 border border-rose-500/30 rounded-xl text-xs font-semibold text-rose-300 flex items-center justify-center gap-1.5">
          <span>❌</span> Marked as Failed / Blocked
        </div>
      </div>
    </div>
  );
};

export default FailedTask;