/* eslint-disable react/prop-types */
import { LayoutDashboard, UserPlus, Users } from "lucide-react";

export default function Sidebar({ activeTab, setActiveTab }) {
  const menu = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "add", label: "Add Employee", icon: UserPlus },
    { id: "employees", label: "All Employees", icon: Users },
  ];

  return (
    <div className="w-64 bg-white shadow-lg h-screen p-5">
      <div className="space-y-2">
        {menu.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-3 w-full p-3 rounded-lg text-left
              ${
                activeTab === item.id
                  ? "bg-blue-100 text-blue-600"
                  : "hover:bg-gray-100"
              }`}
            >
              <Icon size={18} />
              {item.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
