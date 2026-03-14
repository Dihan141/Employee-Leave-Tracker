/* eslint-disable react/prop-types */
export default function CurrentLeavesTable({ leaves }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow mb-8">
      <h3 className="font-semibold mb-4">Employees Currently on Leave</h3>

      <table className="w-full">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="p-2">Name</th>
            <th className="p-2">Start</th>
            <th className="p-2">End</th>
            <th className="p-2">Reason</th>
          </tr>
        </thead>

        <tbody>
          {leaves.map((l) => (
            <tr key={l.id} className="border-t">
              <td className="p-2">{l.employeeName}</td>
              <td className="p-2">
                {new Date(l.startDate).toLocaleDateString()}
              </td>
              <td className="p-2">
                {new Date(l.endDate).toLocaleDateString()}
              </td>
              <td className="p-2">{l.reason}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
