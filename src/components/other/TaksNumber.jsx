import React from 'react';

const TaskNumber = ({ data }) => {
  const stats = [
    {
      title: "New Tasks",
      count: data?.taskStats?.newTask || 0,
      icon: "✨",
      gradient: "from-blue-600/20 via-indigo-600/10 to-transparent",
      borderColor: "border-blue-500/30",
      textColor: "text-blue-400",
      accentBg: "bg-blue-500/10",
      badge: "Pending Review"
    },
    {
      title: "Active Tasks",
      count: data?.taskStats?.active || 0,
      icon: "⚡",
      gradient: "from-amber-600/20 via-orange-600/10 to-transparent",
      borderColor: "border-amber-500/30",
      textColor: "text-amber-400",
      accentBg: "bg-amber-500/10",
      badge: "In Progress"
    },
    {
      title: "Completed",
      count: data?.taskStats?.completed || 0,
      icon: "✅",
      gradient: "from-emerald-600/20 via-teal-600/10 to-transparent",
      borderColor: "border-emerald-500/30",
      textColor: "text-emerald-400",
      accentBg: "bg-emerald-500/10",
      badge: "Delivered"
    },
    {
      title: "Failed Tasks",
      count: data?.taskStats?.failed || 0,
      icon: "⚠️",
      gradient: "from-rose-600/20 via-pink-600/10 to-transparent",
      borderColor: "border-rose-500/30",
      textColor: "text-rose-400",
      accentBg: "bg-rose-500/10",
      badge: "Needs Attention"
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5 mt-6">
      {stats.map((stat, idx) => (
        <div
          key={idx}
          className={`relative overflow-hidden rounded-2xl p-4 sm:p-5 bg-gradient-to-br ${stat.gradient} bg-gray-900/60 backdrop-blur-md border ${stat.borderColor} shadow-lg hover:shadow-indigo-500/10 hover:-translate-y-1 transition-all duration-300 group`}
        >
          {/* Top Row: Icon + Badge */}
          <div className="flex items-center justify-between mb-3">
            <span className={`text-xl sm:text-2xl p-2 rounded-xl ${stat.accentBg}`}>
              {stat.icon}
            </span>
            <span className={`text-[10px] sm:text-xs font-semibold px-2 py-0.5 rounded-full ${stat.accentBg} ${stat.textColor}`}>
              {stat.badge}
            </span>
          </div>

          {/* Metric count */}
          <div className="mt-2">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
              {stat.count}
            </h2>
            <h3 className="text-xs sm:text-sm font-medium text-gray-400 mt-1">
              {stat.title}
            </h3>
          </div>

          {/* Bottom Accent line */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-current to-transparent opacity-30 group-hover:opacity-70 transition-opacity" style={{ color: stat.textColor.replace('text-', '') }}></div>
        </div>
      ))}
    </div>
  );
};

export default TaskNumber;