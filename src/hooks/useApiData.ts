"use client";

import axios from "axios";
import { useEffect, useState } from "react";

export default function useApidata<T>(url: string) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get<{ meals: T[] }>(url, { signal });
        setData(response.data.meals || []);
      } catch (err) {
        if (!axios.isCancel(err)) {
          setError(err as Error);
          console.error("Fetch error:", err);
        }
      } finally {
        if (!signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      controller.abort();
    };
  }, [url]); // Añade url como dependencia para recargar cuando cambie

  return { data, loading, error };
}
