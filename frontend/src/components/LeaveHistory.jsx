/* eslint-disable react/prop-types */
export default function LeaveHistory({ leaves, cancelLeave }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">Leave History</h3>

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2">Start</th>
            <th className="p-2">End</th>
            <th className="p-2">Reason</th>
            <th className="p-2">Status</th>
            <th className="p-2">Action</th>
          </tr>
        </thead>

        <tbody>
          {leaves.map((leave) => (
            <tr key={leave.id} className="border-t">
              <td className="p-2">
                {new Date(leave.startDate).toLocaleDateString()}
              </td>
              <td className="p-2">
                {new Date(leave.endDate).toLocaleDateString()}
              </td>
              <td className="p-2">{leave.reason}</td>

              <td className="p-2">
                <span
                  className={`px-2 py-1 rounded text-sm ${
                    leave.status === "Approved"
                      ? "bg-green-100 text-green-700"
                      : leave.status === "Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                  }`}
                >
                  {leave.status}
                </span>
              </td>

              <td className="p-2">
                {leave.status === "Pending" && (
                  <button
                    onClick={() => cancelLeave(leave.id)}
                    className="text-red-600 hover:underline"
                  >
                    Cancel
                  </button>
                )}
              </td>
            </tr>
          ))}

          {leaves.length === 0 && (
            <tr>
              <td colSpan="5" className="text-center p-4 text-gray-500">
                No leave history
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
