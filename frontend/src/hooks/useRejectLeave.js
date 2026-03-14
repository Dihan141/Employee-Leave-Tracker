import { useState } from "react";
import api from "../api/axios";
import { toast } from "react-toastify";

export default function useRejectLeave() {
  const [loading, setLoading] = useState(false);

  const rejectLeave = async (id) => {
    try {
      setLoading(true);

      const res = await api.put(`/leaves/${id}/reject`);

      toast.success(res.data.message);
    } catch (err) {
      toast.error("Failed to reject leave");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return { rejectLeave, loading };
}
