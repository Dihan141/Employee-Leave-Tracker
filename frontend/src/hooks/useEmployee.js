import { useEffect, useState } from "react";
import api from "../api/axios";
import { toast } from "react-toastify";

export default function useEmployees() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEmployees = async () => {
    try {
      setLoading(true);

      const res = await api.get(`/employees`);

      setEmployees(res.data);
    } catch (err) {
      toast.error("Failed to load employees");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return {
    employees,
    loading,
    refetchEmployees: fetchEmployees,
  };
}
