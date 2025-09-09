# Stock Data Web Application

This is a Next.js project built to display real-time stock information from the Swedish stock market.

---

## 🚀 Getting Started

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
Open http://localhost:3000 in your browser to see the result.

🛠 Project Structure
/app – Main Next.js app directory

/hooks – Custom React hooks (e.g., useStocks.ts)

/models/interfaces – TypeScript interfaces

/mocks – Mock data for development

🧪 Using Mock Data for Development
To speed up development and avoid relying on a live backend, you can mock stock data locally.

📁 Mock Data File Structure
mocks/names.json
Used in useFetchStocks.ts to mock a list of stock tickers and names:

json
Kopiera kod
[
  { "ticker": "VITEC-B.ST", "name": "Vitec Software Group AB (publ)" },
  { "ticker": "VITR.ST", "name": "Vitrolife AB (publ)" },
  { "ticker": "VNV.ST", "name": "VNV Global Ltd" }
]
mocks/details.json
Used in useStocks.ts to mock detailed stock data:

json
Kopiera kod
[
  {
    "ticker": "ACAD.ST",
    "name": "AcadeMedia AB (publ)",
    "change": -2.3,
    "price": 97,
    "currency": "SEK",
    "metrics": {
      "enterprise_value": 21157865472,
      "ev_ebitda": 9.905,
      "ev_revenue": 1.112,
      "forward_pe": 8.998145,
      "market_cap": 9604134912,
      "pb_ratio": 1.4494703,
      "peg_ratio": null,
      "ps_ratio": 0.5049227,
      "trailing_pe": 11.916461
    },
    "priceHistory": [97.1, 97.3, 97, 97.2, 97]
  }
]
📦 Mocking useFetchStocks.ts
Import mock data:

ts
Kopiera kod
import mockNames from "@/mocks/names.json";
Replace API call in useEffect:

ts
Kopiera kod
useEffect(() => {
  // MOCK DATA (uncomment for development)
  setStocks(mockNames as Stock[]);
  setLoading(false);
  setError(null);

  // REAL API (comment out during development)
  /*
  fetch("https://stockdata-api-rk1o.onrender.com/api/stocks/names")
    .then(...)
  */
}, []);
📦 Mocking useStocks.ts
This hook fetches detailed stock information for selected tickers. During development, you can use mocks/details.json instead of the live API.

1. Import mock data
At the top of useStocks.ts:

ts
Kopiera kod
import mockDetails from "@/mocks/details.json";
2. Use mock instead of real fetch
Inside useEffect, replace the real fetch with:

ts
Kopiera kod
useEffect(() => {
  // MOCK DATA (uncomment for development)
  setStocks(mockDetails as Stock[]);
  setLoading(false);
  setError(null);

  // REAL API (comment out during development)
  /*
  setLoading(true);
  if (tickers.length === 0) {
    setStocks([]);
    setLoading(false);
    return;
  }

  Promise.all(
    tickers.map((ticker) => {
      return fetch(`https://stockdata-api-rk1o.onrender.com/api/stocks/details/${ticker}`)
        .then((response) => {
          if (!response.ok) throw new Error("Failed to retrieve stocks");
          return response.json();
        });
    })
  )
    .then(setStocks)
    .catch((err) => {
      setError(err instanceof Error ? err.message : "Unknown error");
    })
    .finally(() => setLoading(false));
  */
}, [tickers]);
✅ Tip: You can also filter the mock data to only include the selected tickers:

ts
Kopiera kod
const filteredStocks = (mockDetails as Stock[]).filter((stock) =>
  tickers.includes(stock.ticker)
);
setStocks(filteredStocks);
🔄 Switching Between Mock and Real API
To switch between mock data and real API:

Use mock data: Comment out the API fetch code and uncomment setStocks(mockData).

Use real API: Comment out setStocks(mockData) and uncomment the API fetch block.

This allows you to develop frontend features without requiring a running backend.
```
