import { useEffect, useState, useCallback } from "react";
import api from "../api/axios";
import { toast } from "react-toastify";

export default function useCurrentLeaves() {
  const [currentLeaves, setCurrentLeaves] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCurrentLeaves = useCallback(async () => {
    try {
      setLoading(true);

      const res = await api.get(`/leaves/current`);

      setCurrentLeaves(res.data);
    } catch (err) {
      toast.error("Failed to load current leaves");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCurrentLeaves();
  }, [fetchCurrentLeaves]);

  return {
    currentLeaves,
    loading,
    refetchCurrentLeaves: fetchCurrentLeaves,
  };
}
