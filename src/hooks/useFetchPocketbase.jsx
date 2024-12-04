import { useState, useEffect } from "react";

export function useFetchPocketbase(fetchFunction, ...args) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await fetchFunction(...args);
        setData(result);
        console.log(result);
      } catch (err) {
        console.error("Error fetching data from PocketBase:", err);
        setError(err.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [fetchFunction, ...args]);

  return { data, loading, error };
}
