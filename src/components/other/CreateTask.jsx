import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';

const CreateTask = () => {
  const [userData, setuserData] = useContext(AuthContext);

  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskDate, setTaskDate] = useState('');
  const [assignTo, setAssignTo] = useState('');
  const [category, setCategory] = useState('');
  const [feedback, setFeedback] = useState({ type: '', message: '' });

  const categories = ['Design', 'Development', 'Bug Fix', 'Backend', 'Testing', 'Deployment'];

  const submitHandler = (e) => {
    e.preventDefault();
    setFeedback({ type: '', message: '' });

    if (!assignTo) {
      setFeedback({ type: 'error', message: 'Please select an employee to assign this task.' });
      return;
    }

    const taskObj = {
      title: taskTitle.trim(),
      description: taskDescription.trim(),
      date: taskDate,
      assignTo,
      category: category.trim() || 'General',
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
      setFeedback({ type: 'error', message: `Employee "${assignTo}" not found.` });
      return;
    }

    setuserData(updatedData);
    localStorage.setItem("employees", JSON.stringify(updatedData));

    setTaskTitle('');
    setTaskDescription('');
    setTaskDate('');
    setAssignTo('');
    setCategory('');
    setFeedback({ type: 'success', message: `Task assigned to ${assignTo} successfully!` });

    setTimeout(() => {
      setFeedback({ type: '', message: '' });
    }, 4000);
  };

  return (
    <div className="mt-8 bg-gray-900/70 backdrop-blur-md rounded-2xl p-5 sm:p-7 border border-gray-800 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 mb-6 border-b border-gray-800/80 gap-2">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <span>✨</span> Create & Assign Task
          </h2>
          <p className="text-gray-400 text-xs sm:text-sm mt-0.5">
            Assign new deliverables and deadlines to your team members
          </p>
        </div>
        <span className="self-start sm:self-auto px-3 py-1 rounded-full text-xs font-medium bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
          Admin Control
        </span>
      </div>

      {feedback.message && (
        <div className={`mb-5 p-3 rounded-xl text-xs sm:text-sm flex items-center gap-2 ${
          feedback.type === 'success'
            ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-300'
            : 'bg-rose-500/10 border border-rose-500/30 text-rose-300'
        }`}>
          <span>{feedback.type === 'success' ? '✅' : '⚠️'}</span>
          <span>{feedback.message}</span>
        </div>
      )}

      <form onSubmit={submitHandler} className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6">
        {/* Left Column */}
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1.5 uppercase tracking-wider">
              Task Title
            </label>
            <input
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              type="text"
              placeholder="e.g. Redesign Landing Page Hero"
              required
              className="w-full bg-gray-950/70 border border-gray-700/80 rounded-xl px-4 py-2.5 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1.5 uppercase tracking-wider">
              Assign To Employee
            </label>
            <select
              value={assignTo}
              onChange={(e) => setAssignTo(e.target.value)}
              required
              className="w-full bg-gray-950/70 border border-gray-700/80 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition cursor-pointer"
            >
              <option value="" disabled className="bg-gray-900 text-gray-400">
                -- Choose Team Member --
              </option>
              {userData?.map((emp) => (
                <option key={emp.id} value={emp.firstName} className="bg-gray-900 text-white">
                  {emp.firstName} ({emp.email})
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5 uppercase tracking-wider">
                Due Date
              </label>
              <input
                value={taskDate}
                onChange={(e) => setTaskDate(e.target.value)}
                type="date"
                required
                className="w-full bg-gray-950/70 border border-gray-700/80 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5 uppercase tracking-wider">
                Category
              </label>
              <input
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                type="text"
                placeholder="Design, Dev, etc."
                required
                className="w-full bg-gray-950/70 border border-gray-700/80 rounded-xl px-4 py-2.5 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
              />
            </div>
          </div>

          {/* Quick category pills */}
          <div>
            <p className="text-[11px] text-gray-400 mb-2 font-medium">Quick Category:</p>
            <div className="flex flex-wrap gap-1.5">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
                  className={`text-[11px] px-2.5 py-1 rounded-lg border transition ${
                    category === cat
                      ? 'bg-indigo-600 text-white border-indigo-500'
                      : 'bg-gray-950/50 text-gray-400 border-gray-800 hover:text-white hover:border-gray-700'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Description + Submit */}
        <div className="flex flex-col justify-between space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1.5 uppercase tracking-wider">
              Detailed Description
            </label>
            <textarea
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
              rows="6"
              placeholder="Outline specific objectives, technical requirements, acceptance criteria..."
              required
              className="w-full bg-gray-950/70 border border-gray-700/80 rounded-xl px-4 py-2.5 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 px-6 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:from-indigo-500 hover:to-purple-500 shadow-lg shadow-indigo-600/30 active:scale-[0.98] transition cursor-pointer flex items-center justify-center gap-2"
          >
            <span>🚀</span> Assign Task to Employee
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateTask;