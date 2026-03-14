import { useState } from "react";
import api from "../api/axios";
import { toast } from "react-toastify";

export default function useApproveLeave() {
  const [loading, setLoading] = useState(false);

  const approveLeave = async (id) => {
    try {
      setLoading(true);

      const res = await api.put(`/leaves/${id}/approve`);

      toast.success(res.data.message);
    } catch (err) {
      toast.error("Failed to approve leave");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return { approveLeave, loading };
}
