/* eslint-disable react/prop-types */
export default function EmployeesTable({ employees, onEdit, onDelete }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="font-semibold mb-4">All Employees</h2>

      <table className="w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 text-left">Name</th>
            <th className="p-2 text-left">Email</th>
            <th className="p-2 text-left">Total Leaves</th>
            <th className="p-2 text-left">Remaining Leaves</th>
            <th className="p-2 text-left">Joining Date</th>
            <th className="p-2 text-left">Action</th>
          </tr>
        </thead>

        <tbody>
          {employees.map((e) => (
            <tr key={e.id} className="border-t">
              <td className="p-2">{e.name}</td>
              <td className="p-2">{e.email}</td>
              <td className="p-2">{e.totalLeaves}</td>
              <td className="p-2">{e.remainingLeaves ?? "N/A"}</td>
              <td className="p-2">
                {new Date(e.joiningDate).toLocaleDateString()}
              </td>

              <td className="p-2 space-x-2">
                <button className="text-blue-600" onClick={() => onEdit(e)}>
                  Edit
                </button>
                <button className="text-red-600" onClick={() => onDelete(e)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}

          {employees.length === 0 && (
            <tr>
              <td colSpan="6" className="text-center p-4 text-gray-500">
                No employees found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
