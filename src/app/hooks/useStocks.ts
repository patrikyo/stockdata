import { useEffect, useState } from "react";
import Stock from "../models/interfaces/stock.interface";

const useStocks = (tickers: string[]) => {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (tickers.length === 0) {
      setStocks([]);
      setLoading(false);
      return;
    }

    const fetchStocks = () => {
      Promise.all(
        tickers.map((ticker) => {
          return fetch(`http://127.0.0.1:5000/api/stock/${ticker}`).then(
            (response) => {
              if (!response.ok) {
                throw new Error(`Fel vid hämtning av aktier`);
              }
              return response.json();
            }
          );
        })
      )
        .then((result) => {
          setStocks(result);
          setLoading(false);
        })
        .catch((error) => {
          setError(error.message);
          setLoading(false);
        });
    };

    fetchStocks();
  }, [tickers]);

  return { stocks, error, loading };
};

export default useStocks;
