import LeaveForm from "../components/LeaveForm";
import LeaveHistory from "../components/LeaveHistory";
import LeaveStats from "../components/LeaveStats";
import Navbar from "../components/Navbar";
import useLeavesEmployee from "../hooks/useLeavesEmployee";

export default function EmployeeDashboard() {
  const {
    user,
    leaves,
    form,
    setForm,
    applyLeave,
    cancelLeave,
    remainingLeaves,
    leavesTaken,
    pendingLeaves,
    error,
  } = useLeavesEmployee();

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <Navbar />

      <div className="max-w-5xl mx-auto p-6">
        {/* Welcome */}
        <h2 className="text-2xl font-semibold mb-6">Welcome, {user?.name}</h2>

        {/* Cards */}
        <LeaveStats
          remainingLeaves={remainingLeaves}
          leavesTaken={leavesTaken}
          pendingLeaves={pendingLeaves}
        />

        {/* Leave Request Form */}
        <LeaveForm
          form={form}
          setForm={setForm}
          applyLeave={applyLeave}
          error={error}
        />

        {/* Leave History */}
        <LeaveHistory leaves={leaves} cancelLeave={cancelLeave} />
      </div>
    </div>
  );
}
