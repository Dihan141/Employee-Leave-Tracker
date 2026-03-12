import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function HomeRedirect() {
  const { token, role } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else if (role === "admin") {
      navigate("/admin-dashboard");
    } else {
      navigate("/dashboard"); // default employee dashboard
    }
  }, [token, role, navigate]);

  return null;
}
