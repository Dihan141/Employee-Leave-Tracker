import { useState, useEffect } from "react";
import api from "../api/axios";

export default function useLeaves() {
  const [user, setUser] = useState(null);

  const [form, setForm] = useState({
    startDate: "",
    endDate: "",
    reason: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchUser = async () => {
    try {
      const res = await api.get(`/employees/me`);
      console.log(res.data);

      setUser(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load user data");
    }
  };

  const applyLeave = async () => {
    if (!form.startDate || !form.endDate || !form.reason) {
      setError("All fields are required");
      return false;
    }

    try {
      setLoading(true);

      await api.post(`/leaves`, form);

      setForm({
        startDate: "",
        endDate: "",
        reason: "",
      });

      await fetchUser();

      return true;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to submit leave");

      return false;
    } finally {
      setLoading(false);
    }
  };

  const cancelLeave = async (id) => {
    try {
      await api.put(`/leaves/${id}/cancel`);

      await fetchUser();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to cancel leave");
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const leaves = user?.leaves || [];

  const leavesTaken = user?.totalLeaves - user?.remainingLeaves;

  const pendingLeaves = leaves.filter((l) => l.status === "Pending").length;

  return {
    user,

    leaves,

    form,
    setForm,

    loading,
    error,

    applyLeave,
    cancelLeave,

    totalLeaves: user?.totalLeaves || 0,
    remainingLeaves: user?.remainingLeaves || 0,

    leavesTaken,
    pendingLeaves,
  };
}
