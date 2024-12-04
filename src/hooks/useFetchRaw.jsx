import { useState, useEffect } from "react";

const useFetchRaw = (url) => {
  const [rawContent, setRawContent] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!url) return;

    console.log(url);

    const fetchRaw = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.statusText}`);
        }
        const text = await response.text();
        setRawContent(text);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRaw();
  }, [url]);

  return { rawContent, isLoading, error };
};

export { useFetchRaw };
