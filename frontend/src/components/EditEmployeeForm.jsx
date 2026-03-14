/* eslint-disable react/prop-types */
import { useState } from "react";
import useUpdateEmployee from "../hooks/useUpdateEmployee";

export default function EditEmployeeForm({
  employee,
  onClose,
  refreshEmployees,
}) {
  const { updateEmployee, loading } = useUpdateEmployee();

  const [form, setForm] = useState({
    name: employee.name,
    email: employee.email,
    totalLeaves: employee.totalLeaves,
    remainingLeaves: employee.remainingLeaves ?? 0,
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await updateEmployee(employee.id, {
      ...form,
      totalLeaves: Number(form.totalLeaves),
      remainingLeaves: Number(form.remainingLeaves),
    });

    refreshEmployees();
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40">
      <div className="bg-white p-6 rounded-lg w-[400px]">
        <h2 className="text-lg font-semibold mb-4">Edit Employee</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              Name
            </label>
            <input
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email
            </label>
            <input
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>

          {/* Total Leaves */}
          <div>
            <label
              htmlFor="totalLeaves"
              className="block text-sm font-medium mb-1"
            >
              Total Leaves
            </label>
            <input
              id="totalLeaves"
              type="number"
              name="totalLeaves"
              value={form.totalLeaves}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>

          {/* Remaining Leaves */}
          <div>
            <label
              htmlFor="remainingLeaves"
              className="block text-sm font-medium mb-1"
            >
              Remaining Leaves
            </label>
            <input
              id="remainingLeaves"
              type="number"
              name="remainingLeaves"
              value={form.remainingLeaves}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>

          <div className="flex justify-end gap-2 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-2 bg-gray-200 rounded"
            >
              Cancel
            </button>

            <button
              disabled={loading}
              className="px-3 py-2 bg-blue-600 text-white rounded"
            >
              {loading ? "Updating..." : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
