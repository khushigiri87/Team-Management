import React from "react";

const NewTask = ({ data, index, onUpdateTask }) => {
  return (
    <div className="min-w-[280px] sm:min-w-[320px] max-w-[340px] flex-shrink-0 bg-gradient-to-br from-blue-900/40 via-indigo-900/30 to-gray-900/60 backdrop-blur-md rounded-2xl p-5 border border-blue-500/30 shadow-xl flex flex-col justify-between hover:-translate-y-1 transition-all duration-300">
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-blue-500/20 text-blue-300 border border-blue-500/30 uppercase tracking-wider">
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

      <div className="mt-5 pt-4 border-t border-blue-500/20">
        <button
          onClick={() => onUpdateTask && onUpdateTask(index, 'active')}
          className="w-full py-2.5 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl text-xs sm:text-sm font-semibold shadow-md shadow-blue-600/25 active:scale-95 transition cursor-pointer flex items-center justify-center gap-2"
        >
          <span>⚡</span> Accept Task
        </button>
      </div>
    </div>
  );
};

export default NewTask;