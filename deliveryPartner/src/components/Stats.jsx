import React from "react";
import { Package, CheckCircle2, Clock, IndianRupee, TrendingUp } from "lucide-react";

const StatsCards = () => {
  const stats = [
    {
      title: "Today Orders",
      value: "25",
      icon: <Package className="w-6 h-6" />,
      color: "from-blue-500 to-cyan-400",
      shadow: "shadow-blue-500/20",
      trend: "+12% vs yesterday"
    },
    {
      title: "Completed",
      value: "18",
      icon: <CheckCircle2 className="w-6 h-6" />,
      color: "from-emerald-500 to-teal-400",
      shadow: "shadow-emerald-500/20",
      trend: "85% success rate"
    },
    {
      title: "Pending Orders",
      value: "07",
      icon: <Clock className="w-6 h-6" />,
      color: "from-orange-500 to-amber-400",
      shadow: "shadow-orange-500/20",
      trend: "Requires attention"
    },
   
    {
      title: "Today Earnings",
      value: "₹4,500",
      icon: <IndianRupee className="w-6 h-6" />,
      color: "from-indigo-600 to-purple-500",
      shadow: "shadow-indigo-500/20",
      trend: "+5.4% growth"
    }
  ];

  return (
    <div className="grid grid-cols-2 mt-15 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6 bg-[#f8fafc]">
      {stats.map((item, index) => (
        <div 
          key={index} 
          className="group relative bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
        >
          {/* Top Row: Icon & Trend */}
          <div className="flex justify-between items-start mb-4">
            <div className={`p-3 rounded-2xl bg-gradient-to-br ${item.color} text-white shadow-lg ${item.shadow} group-hover:scale-110 transition-transform duration-300`}>
              {item.icon}
            </div>
            <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider bg-slate-50 px-2 py-1 rounded-lg">
              <TrendingUp className="w-3 h-3 text-emerald-500" />
              Live
            </div>
          </div>

          {/* Content */}
          <div className="space-y-1">
            <h3 className="text-slate-500 text-sm font-medium tracking-wide">
              {item.title}
            </h3>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-slate-800 tracking-tight">
                {item.value}
              </span>
            </div>
          </div>

          {/* Footer Trend */}
          {/* <p className="mt-4 text-xs font-semibold text-slate-400 flex items-center gap-1">
            <span className={index === 2 ? "text-orange-500" : "text-emerald-500"}>
              ●
            </span>
            {item.trend}
          </p> */}

          {/* Decorative background element */}
          <div className={`absolute -right-4 -bottom-4 w-24 h-24 bg-gradient-to-br ${item.color} opacity-[0.03] rounded-full group-hover:scale-150 transition-transform duration-700`}></div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;