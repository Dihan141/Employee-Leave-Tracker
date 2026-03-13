/* eslint-disable react/prop-types */
export default function LeaveForm({ form, setForm, applyLeave, error }) {
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await applyLeave();
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow mb-8">
      <h3 className="text-lg font-semibold mb-4">Request Leave</h3>

      {error && <p className="text-red-500 mb-3">{error}</p>}

      <form onSubmit={handleSubmit} className="grid md:grid-cols-3 gap-4">
        <input
          type="date"
          name="startDate"
          value={form.startDate}
          onChange={handleChange}
          className="border rounded p-2"
        />

        <input
          type="date"
          name="endDate"
          value={form.endDate}
          onChange={handleChange}
          className="border rounded p-2"
        />

        <input
          type="text"
          name="reason"
          placeholder="Reason"
          value={form.reason}
          onChange={handleChange}
          className="border rounded p-2"
        />

        <div className="md:col-span-3">
          <button
            type="submit"
            className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
          >
            Submit Request
          </button>
        </div>
      </form>
    </div>
  );
}
