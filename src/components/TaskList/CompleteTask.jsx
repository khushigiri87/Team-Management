import React from "react";

const CompleteTask = ({ data }) => {
  return (
    <div className="min-w-[280px] sm:min-w-[320px] max-w-[340px] flex-shrink-0 bg-gradient-to-br from-emerald-900/40 via-teal-900/30 to-gray-900/60 backdrop-blur-md rounded-2xl p-5 border border-emerald-500/30 shadow-xl flex flex-col justify-between hover:-translate-y-1 transition-all duration-300">
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 uppercase tracking-wider">
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

      <div className="mt-5 pt-4 border-t border-emerald-500/20">
        <div className="w-full py-2 px-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-xs font-semibold text-emerald-300 flex items-center justify-center gap-1.5">
          <span>✅</span> Completed Successfully
        </div>
      </div>
    </div>
  );
};

export default CompleteTask;