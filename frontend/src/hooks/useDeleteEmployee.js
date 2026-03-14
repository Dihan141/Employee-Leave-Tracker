import { useState } from "react";
import api from "../api/axios";
import { toast } from "react-toastify";

export default function useDeleteEmployee() {
  const [loading, setLoading] = useState(false);

  const deleteEmployee = async (id) => {
    try {
      setLoading(true);

      await api.delete(`/employees/${id}`);

      toast.success("Employee deleted successfully");
    } catch (err) {
      toast.error("Failed to delete employee");
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { deleteEmployee, loading };
}
