import React from "react";

const AcceptTask = ({ data, index, onUpdateTask }) => {
  return (
    <div className="min-w-[280px] sm:min-w-[300px] flex-shrink-0 bg-yellow-500 rounded-xl p-5 text-white flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between text-xs mb-3">
          <span className="bg-black/20 px-2 py-1 rounded font-medium">
            {data.category || 'General'}
          </span>
          <span className="opacity-90">
            {data.date}
          </span>
        </div>

        <h3 className="text-lg font-bold">
          {data.title}
        </h3>

        <p className="mt-2 text-xs sm:text-sm text-yellow-100 line-clamp-3">
          {data.description}
        </p>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-2">
        <button
          onClick={() => onUpdateTask && onUpdateTask(index, 'completed')}
          className="py-1.5 px-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-xs font-medium transition cursor-pointer"
        >
          Completed
        </button>

        <button
          onClick={() => onUpdateTask && onUpdateTask(index, 'failed')}
          className="py-1.5 px-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-medium transition cursor-pointer"
        >
          Failed
        </button>
      </div>
    </div>
  );
};

export default AcceptTask;