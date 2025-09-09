import { useState, useEffect } from "react";
import mockNames from "../mocks/names.json";
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
    /* Mock data for development without API
    setStocks(mockNames as Stock[]);
    setLoading(false);
    setError(null);
    */
    //comment out above and uncomment below to use real API
    setLoading(true);
    fetch("https://stockdata-api-rk1o.onrender.com/api/stocks/names")
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
