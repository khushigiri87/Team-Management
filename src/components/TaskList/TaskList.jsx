import React from "react";
import AcceptTask from "./AcceptTask";
import NewTask from "./NewTask";
import CompleteTask from "./CompleteTask";
import FailedTask from "./FaieldTask";

const TaskList = ({ data, onUpdateTask }) => {
  const tasks = data?.tasks || [];

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <span>📋</span> My Assigned Tasks
          </h2>
          <p className="text-gray-400 text-xs sm:text-sm mt-0.5">
            Scroll horizontally to review tasks and update their status
          </p>
        </div>
        <span className="text-xs text-indigo-300 bg-indigo-500/10 border border-indigo-500/20 px-3 py-1 rounded-full font-semibold">
          {tasks.length} {tasks.length === 1 ? 'Task' : 'Tasks'}
        </span>
      </div>

      {tasks.length === 0 ? (
        <div className="bg-gray-900/50 backdrop-blur-md border border-gray-800 rounded-2xl p-10 text-center shadow-xl">
          <span className="text-4xl">🎉</span>
          <h3 className="text-white font-semibold text-lg mt-3">All Caught Up!</h3>
          <p className="text-gray-400 text-sm mt-1">You have no tasks pending at the moment.</p>
        </div>
      ) : (
        <div
          id="tasklist"
          className="flex overflow-x-auto gap-4 sm:gap-5 pb-4 pt-1 scrollbar-hide"
        >
          {tasks.map((elem, index) => {
            if (elem.active) {
              return <AcceptTask key={index} index={index} data={elem} onUpdateTask={onUpdateTask} />;
            }
            if (elem.newTask) {
              return <NewTask key={index} index={index} data={elem} onUpdateTask={onUpdateTask} />;
            }
            if (elem.completed) {
              return <CompleteTask key={index} index={index} data={elem} />;
            }
            if (elem.failed) {
              return <FailedTask key={index} index={index} data={elem} />;
            }
            return null;
          })}
        </div>
      )}
    </div>
  );
};

export default TaskList;