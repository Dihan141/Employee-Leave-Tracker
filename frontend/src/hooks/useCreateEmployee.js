import { useState } from "react";
import { toast } from "react-toastify";
import api from "../api/axios";

export default function useCreateEmployee() {
  const [loading, setLoading] = useState(false);

  const createEmployee = async (employeeData) => {
    try {
      setLoading(true);

      const res = await api.post(`/employees`, employeeData);

      toast.success("Employee created successfully");

      return res.data;
    } catch (err) {
      const message =
        err.response?.data?.message || "Failed to create employee";

      toast.error(message);

      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { createEmployee, loading };
}
