import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';

const CreateTask = () => {
  const [userData, setuserData] = useContext(AuthContext);

  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskDate, setTaskDate] = useState('');
  const [assignTo, setAssignTo] = useState('');
  const [category, setCategory] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();

    const taskObj = {
      title: taskTitle.trim(),
      description: taskDescription.trim(),
      date: taskDate,
      assignTo,
      category: category.trim(),
      active: false,
      newTask: true,
      failed: false,
      completed: false
    };

    const data = userData || JSON.parse(localStorage.getItem('employees')) || [];
    let assigned = false;

    const updatedData = data.map((elem) => {
      if (assignTo.toLowerCase() === elem.firstName.toLowerCase()) {
        assigned = true;
        return {
          ...elem,
          taskStats: {
            ...elem.taskStats,
            newTask: (elem.taskStats?.newTask || 0) + 1
          },
          tasks: [...(elem.tasks || []), taskObj]
        };
      }
      return elem;
    });

    if (!assigned) {
      alert(`Employee "${assignTo}" not found.`);
      return;
    }

    setuserData(updatedData);
    localStorage.setItem("employees", JSON.stringify(updatedData));

    setTaskTitle('');
    setTaskDescription('');
    setTaskDate('');
    setAssignTo('');
    setCategory('');

    alert('Task Created Successfully!');
  };

  return (
    <div className="mt-8 bg-gray-900 border border-gray-800 rounded-xl p-5 sm:p-7">
      <h2 className="text-xl font-bold text-white mb-5 pb-3 border-b border-gray-800">
        Create Task
      </h2>

      <form onSubmit={submitHandler} className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-300 mb-1">
              Task Title
            </label>
            <input
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              type="text"
              placeholder="Enter task title"
              required
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3.5 py-2 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-300 mb-1">
              Assign To
            </label>
            <select
              value={assignTo}
              onChange={(e) => setAssignTo(e.target.value)}
              required
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3.5 py-2 text-white text-sm focus:outline-none focus:border-emerald-500"
            >
              <option value="" disabled className="bg-gray-800 text-gray-400">
                Select Employee
              </option>
              {userData?.map((emp) => (
                <option key={emp.id} value={emp.firstName} className="bg-gray-800 text-white">
                  {emp.firstName}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1">
                Date
              </label>
              <input
                value={taskDate}
                onChange={(e) => setTaskDate(e.target.value)}
                type="date"
                required
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3.5 py-2 text-white text-sm focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1">
                Category
              </label>
              <input
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                type="text"
                placeholder="Design, Dev, etc."
                required
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3.5 py-2 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-between space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-300 mb-1">
              Description
            </label>
            <textarea
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
              rows="5"
              placeholder="Enter task description..."
              required
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3.5 py-2 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-emerald-500 resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg text-sm transition"
          >
            Create Task
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateTask;