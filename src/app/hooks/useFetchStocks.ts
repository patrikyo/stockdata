// hooks/useFetchStocks.ts
import { useState, useEffect } from "react";
import Stock from "@/app/models/interfaces/stock.interface";

interface FetchState {
  stocks: Stock[];
  error: string | null;
  loading: boolean;
}

const useFetchStocks = (): FetchState => {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    fetch("http://127.0.0.1:5000/api/stocks/names")
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            "Could not retrieve the list. Please try again later."
          );
        }
        return response.json();
      })
      .then((data) => {
        setStocks(data);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { stocks, error, loading };
};

export default useFetchStocks;
