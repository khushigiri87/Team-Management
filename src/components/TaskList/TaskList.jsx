import React from "react";
import AcceptTask from "./AcceptTask";
import NewTask from "./NewTask";
import CompleteTask from "./CompleteTask";
import FailedTask from "./FaieldTask";

const TaskList = ({ data, onUpdateTask }) => {
  const tasks = data?.tasks || [];

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold text-white mb-4">
        My Tasks
      </h2>

      {tasks.length === 0 ? (
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-8 text-center text-gray-400 text-sm">
          No tasks assigned yet.
        </div>
      ) : (
        <div
          id="tasklist"
          className="flex overflow-x-auto gap-4 pb-4 pt-1 scrollbar-hide"
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