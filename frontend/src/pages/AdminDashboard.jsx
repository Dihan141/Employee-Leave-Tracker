import { useState } from "react";

import Sidebar from "../components/Sidebar";
import SummaryCards from "../components/SummaryCards";
import CurrentLeavesTable from "../components/CurrentLeavesTable";
import PendingLeavesTable from "../components/PendingLeavesTable";
import EmployeeForm from "../components/EmployeeForm";
import EmployeesTable from "../components/EmployeesTable";
import Navbar from "../components/Navbar";
import useEmployees from "../hooks/useEmployee";
import EditEmployeeForm from "../components/EditEmployeeForm";

export default function AdminDashboard() {
  const { employees, loading, refetchEmployees } = useEmployees();
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [activeTab, setActiveTab] = useState("dashboard");

  const currentLeaves = [
    { id: 1, name: "Alice", start: "Mar 10", end: "Mar 12", reason: "Medical" },
  ];

  const pendingLeaves = [
    { id: 2, name: "Bob", start: "Mar 15", end: "Mar 16", reason: "Vacation" },
  ];

  return (
    <div>
      <Navbar />
      <div className="flex bg-gray-100 min-h-screen">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

        <div className="flex-1 p-8">
          {activeTab === "dashboard" && (
            <>
              <SummaryCards
                employees={employees.length}
                onLeave={currentLeaves.length}
                pending={pendingLeaves.length}
              />

              <CurrentLeavesTable leaves={currentLeaves} />

              <PendingLeavesTable leaves={pendingLeaves} />
            </>
          )}

          {activeTab === "add" && (
            <EmployeeForm refreshEmployee={refetchEmployees} />
          )}

          {activeTab === "employees" && (
            <>
              {loading ? (
                <p>Loading employees...</p>
              ) : (
                <EmployeesTable
                  employees={employees}
                  onEdit={(emp) => setEditingEmployee(emp)}
                />
              )}
            </>
          )}

          {editingEmployee && (
            <EditEmployeeForm
              employee={editingEmployee}
              onClose={() => setEditingEmployee(null)}
              refreshEmployees={refetchEmployees}
            />
          )}
        </div>
      </div>
    </div>
  );
}
