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
import useDeleteEmployee from "../hooks/useDeleteEmployee";
import ConfirmationModal from "../components/ConfirmationModal";
import useLeavesAdmin from "../hooks/useLeavesAdmin";
import useApproveLeave from "../hooks/useApproveLeave";
import useRejectLeave from "../hooks/useRejectLeave";
import useCurrentLeaves from "../hooks/useCurrentLeaves";

export default function AdminDashboard() {
  const { employees, loading, refetchEmployees } = useEmployees();
  const { deleteEmployee, loading: deleteLoading } = useDeleteEmployee();
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);

  const { leaves, refetchLeaves } = useLeavesAdmin();
  const [activeTab, setActiveTab] = useState("dashboard");

  const { approveLeave } = useApproveLeave();
  const { rejectLeave } = useRejectLeave();

  const [leaveAction, setLeaveAction] = useState(null);

  const { currentLeaves, refetchCurrentLeaves } = useCurrentLeaves();

  const handleConfirmLeaveAction = async () => {
    if (!leaveAction) return;

    if (leaveAction.type === "approve") {
      await approveLeave(leaveAction.leave.id);
    }

    if (leaveAction.type === "reject") {
      await rejectLeave(leaveAction.leave.id);
    }

    setLeaveAction(null);

    refetchLeaves();
    refetchCurrentLeaves();
  };

  const handleConfirmDelete = async () => {
    if (!employeeToDelete) return;

    await deleteEmployee(employeeToDelete.id);

    setEmployeeToDelete(null);

    refetchEmployees();
  };

  const pendingLeaves = leaves.filter((leave) => leave.status === "Pending");

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

              <PendingLeavesTable
                leaves={pendingLeaves}
                onApprove={(leave) =>
                  setLeaveAction({ type: "approve", leave })
                }
                onReject={(leave) => setLeaveAction({ type: "reject", leave })}
              />
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
                  onDelete={(emp) => setEmployeeToDelete(emp)}
                />
              )}
            </>
          )}

          {leaveAction && (
            <ConfirmationModal
              title={
                leaveAction.type === "approve"
                  ? "Approve Leave"
                  : "Reject Leave"
              }
              message={`Are you sure you want to ${
                leaveAction.type
              } leave for ${leaveAction.leave.employeeName}?`}
              confirmText={
                leaveAction.type === "approve" ? "Approve" : "Reject"
              }
              onConfirm={handleConfirmLeaveAction}
              onCancel={() => setLeaveAction(null)}
            />
          )}

          {editingEmployee && (
            <EditEmployeeForm
              employee={editingEmployee}
              onClose={() => setEditingEmployee(null)}
              refreshEmployees={refetchEmployees}
            />
          )}

          {employeeToDelete && (
            <ConfirmationModal
              title="Delete Employee"
              message={`Are you sure you want to delete ${employeeToDelete.name}?`}
              confirmText="Delete"
              onConfirm={handleConfirmDelete}
              onCancel={() => setEmployeeToDelete(null)}
              loading={deleteLoading}
            />
          )}
        </div>
      </div>
    </div>
  );
}
