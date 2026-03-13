/* eslint-disable react/prop-types */
export default function PendingLeavesTable({ leaves }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="font-semibold mb-4">Pending Leave Requests</h3>

      <table className="w-full">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="p-2">Name</th>
            <th className="p-2">Start</th>
            <th className="p-2">End</th>
            <th className="p-2">Reason</th>
            <th className="p-2">Action</th>
          </tr>
        </thead>

        <tbody>
          {leaves.map((l) => (
            <tr key={l.id} className="border-t">
              <td className="p-2">{l.name}</td>
              <td className="p-2">{l.start}</td>
              <td className="p-2">{l.end}</td>
              <td className="p-2">{l.reason}</td>

              <td className="p-2 space-x-2">
                <button className="bg-green-600 text-white px-3 py-1 rounded">
                  Approve
                </button>

                <button className="bg-red-600 text-white px-3 py-1 rounded">
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
