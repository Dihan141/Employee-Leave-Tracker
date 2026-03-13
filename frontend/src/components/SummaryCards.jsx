/* eslint-disable react/prop-types */
export default function SummaryCards({ employees, onLeave, pending }) {
  const cards = [
    { title: "Total Employees", value: employees, color: "text-blue-600" },
    { title: "Employees On Leave", value: onLeave, color: "text-green-600" },
    { title: "Pending Leaves", value: pending, color: "text-yellow-600" },
  ];

  return (
    <div className="grid md:grid-cols-3 gap-6 mb-8">
      {cards.map((card, i) => (
        <div key={i} className="bg-white p-6 rounded-lg shadow">
          <p className="text-gray-500">{card.title}</p>
          <h2 className={`text-3xl font-bold ${card.color}`}>{card.value}</h2>
        </div>
      ))}
    </div>
  );
}
