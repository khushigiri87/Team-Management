import React from "react";

const AcceptTask = ({ data, index, onUpdateTask }) => {
  return (
    <div className="min-w-[280px] sm:min-w-[320px] max-w-[340px] flex-shrink-0 bg-gradient-to-br from-amber-900/40 via-orange-900/30 to-gray-900/60 backdrop-blur-md rounded-2xl p-5 border border-amber-500/30 shadow-xl flex flex-col justify-between hover:-translate-y-1 transition-all duration-300">
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/30 uppercase tracking-wider">
            {data.category || 'General'}
          </span>
          <span className="text-xs text-gray-400 font-medium">
            📅 {data.date}
          </span>
        </div>

        <div className="flex items-center gap-1.5 mb-1.5">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
          <span className="text-[11px] font-semibold text-amber-400 uppercase tracking-wider">In Progress</span>
        </div>

        <h3 className="text-lg font-bold text-white tracking-tight leading-snug">
          {data.title}
        </h3>

        <p className="mt-2 text-xs sm:text-sm text-gray-300 line-clamp-3 leading-relaxed">
          {data.description}
        </p>
      </div>

      <div className="mt-5 pt-4 border-t border-amber-500/20 grid grid-cols-2 gap-2">
        <button
          onClick={() => onUpdateTask && onUpdateTask(index, 'completed')}
          className="py-2 px-2.5 bg-emerald-600/90 hover:bg-emerald-500 text-white rounded-xl text-xs font-semibold shadow-md shadow-emerald-600/20 active:scale-95 transition cursor-pointer flex items-center justify-center gap-1"
        >
          <span>✔</span> Complete
        </button>

        <button
          onClick={() => onUpdateTask && onUpdateTask(index, 'failed')}
          className="py-2 px-2.5 bg-rose-600/90 hover:bg-rose-500 text-white rounded-xl text-xs font-semibold shadow-md shadow-rose-600/20 active:scale-95 transition cursor-pointer flex items-center justify-center gap-1"
        >
          <span>✖</span> Failed
        </button>
      </div>
    </div>
  );
};

export default AcceptTask;