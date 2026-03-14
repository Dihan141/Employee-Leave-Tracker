import { useEffect, useState, useCallback } from "react";
import api from "../api/axios";
import { toast } from "react-toastify";

export default function useLeavesAdmin() {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchLeaves = useCallback(async () => {
    try {
      setLoading(true);

      const res = await api.get(`/leaves`);

      setLeaves(res.data);
    } catch (err) {
      toast.error("Failed to load leaves");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLeaves();
  }, [fetchLeaves]);

  return {
    leaves,
    loading,
    refetchLeaves: fetchLeaves,
  };
}
