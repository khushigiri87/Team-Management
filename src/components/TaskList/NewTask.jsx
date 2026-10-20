import React from "react";

const NewTask = ({ data, index, onUpdateTask }) => {
  return (
    <div className="min-w-[280px] sm:min-w-[300px] flex-shrink-0 bg-blue-600 rounded-xl p-5 text-white flex flex-col justify-between">
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

        <p className="mt-2 text-xs sm:text-sm text-blue-100 line-clamp-3">
          {data.description}
        </p>
      </div>

      <div className="mt-5">
        <button
          onClick={() => onUpdateTask && onUpdateTask(index, 'active')}
          className="w-full py-2 bg-black/20 hover:bg-black/30 text-white rounded-lg text-xs sm:text-sm font-medium transition cursor-pointer"
        >
          Accept Task
        </button>
      </div>
    </div>
  );
};

export default NewTask;