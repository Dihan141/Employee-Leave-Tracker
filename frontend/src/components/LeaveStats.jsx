/* eslint-disable react/prop-types */
export default function LeaveStats({
  remainingLeaves,
  leavesTaken,
  pendingLeaves,
}) {
  return (
    <div className="grid md:grid-cols-3 gap-6 mb-8">
      <div className="bg-white p-6 rounded-lg shadow">
        <p className="text-gray-500">Remaining Leaves</p>
        <h3 className="text-3xl font-bold text-green-600">{remainingLeaves}</h3>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <p className="text-gray-500">Leaves Taken</p>
        <h3 className="text-3xl font-bold text-blue-600">{leavesTaken}</h3>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <p className="text-gray-500">Pending Requests</p>
        <h3 className="text-3xl font-bold text-yellow-600">{pendingLeaves}</h3>
      </div>
    </div>
  );
}
