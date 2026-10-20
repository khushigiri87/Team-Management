import React, { useState, useEffect } from 'react';
import Header from '../other/Header';
import TaksNumber from '../other/TaksNumber';
import TaskList from '../TaskList/TaskList';

const EmployeeDashboard = ({ data }) => {
  const [empData, setEmpData] = useState(data);

  useEffect(() => {
    setEmpData(data);
  }, [data]);

  const updateTask = (taskIndex, newStatus) => {
    const allEmployees = JSON.parse(localStorage.getItem('employees')) || [];
    let updatedSelf = null;

    const updatedEmployees = allEmployees.map((emp) => {
      if (emp.id === empData?.id || emp.email === empData?.email) {
        const tasks = [...(emp.tasks || [])];
        const prevTask = tasks[taskIndex];
        if (!prevTask) return emp;

        const updatedStats = { ...emp.taskStats };

        // deduct previous status count
        if (prevTask.newTask) updatedStats.newTask = Math.max(0, (updatedStats.newTask || 1) - 1);
        if (prevTask.active) updatedStats.active = Math.max(0, (updatedStats.active || 1) - 1);

        // apply new status
        if (newStatus === 'active') {
          updatedStats.active = (updatedStats.active || 0) + 1;
          tasks[taskIndex] = { ...prevTask, newTask: false, active: true, completed: false, failed: false };
        } else if (newStatus === 'completed') {
          updatedStats.completed = (updatedStats.completed || 0) + 1;
          tasks[taskIndex] = { ...prevTask, newTask: false, active: false, completed: true, failed: false };
        } else if (newStatus === 'failed') {
          updatedStats.failed = (updatedStats.failed || 0) + 1;
          tasks[taskIndex] = { ...prevTask, newTask: false, active: false, completed: false, failed: true };
        }

        updatedSelf = { ...emp, taskStats: updatedStats, tasks };
        return updatedSelf;
      }
      return emp;
    });

    if (updatedSelf) {
      setEmpData(updatedSelf);
      localStorage.setItem('employees', JSON.stringify(updatedEmployees));
      const logged = JSON.parse(localStorage.getItem('loggedInUser'));
      if (logged) {
        localStorage.setItem('loggedInUser', JSON.stringify({ ...logged, data: updatedSelf }));
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-gray-100 p-4 sm:p-6 md:p-10">
      <div className="max-w-7xl mx-auto space-y-6">
        <Header data={empData} />
        <TaksNumber data={empData} />
        <TaskList data={empData} onUpdateTask={updateTask} />
      </div>
    </div>
  );
};

export default EmployeeDashboard;