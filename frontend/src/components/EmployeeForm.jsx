/* eslint-disable react/prop-types */
import { useState } from "react";
import useCreateEmployee from "../hooks/useCreateEmployee";

export default function EmployeeForm({ refreshEmployee }) {
  const { createEmployee, loading } = useCreateEmployee();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    totalLeaves: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await createEmployee({
      ...form,
      totalLeaves: Number(form.totalLeaves),
    });

    refreshEmployee();

    setForm({
      name: "",
      email: "",
      password: "",
      totalLeaves: "",
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow max-w-xl">
      <h2 className="text-lg font-semibold mb-6">Add New Employee</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          placeholder="Name"
          required
        />

        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          placeholder="Email"
          required
        />

        <input
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          placeholder="Password"
          required
        />

        <input
          name="totalLeaves"
          type="number"
          value={form.totalLeaves}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          placeholder="Total Leaves"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Creating..." : "Add Employee"}
        </button>
      </form>
    </div>
  );
}
