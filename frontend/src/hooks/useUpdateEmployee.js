import { useState } from "react";
import api from "../api/axios";
import { toast } from "react-toastify";

export default function useUpdateEmployee() {
  const [loading, setLoading] = useState(false);

  const updateEmployee = async (id, data) => {
    try {
      setLoading(true);

      const res = await api.put(`/employees/${id}`, data);

      toast.success("Employee updated successfully");

      return res.data;
    } catch (err) {
      toast.error(err.response.data.message || "Failed to update employee");
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { updateEmployee, loading };
}
