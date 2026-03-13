import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { logout } = useAuth();
  return (
    <>
      <nav className="bg-white shadow flex justify-between items-center px-6 py-4">
        <h1 className="text-xl font-semibold">Leave Tracker</h1>

        <button
          onClick={logout}
          className="text-red-500 hover:text-red-700 font-medium"
        >
          Logout
        </button>
      </nav>
    </>
  );
}

export default Navbar;
