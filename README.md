Här är din kompletta README-fil med de nya instruktionerna för mock-data för useStocks-hooken inlagda på rätt plats. Allt är nu samlat i en enda, sammanhängande fil.

Stock Data Web Application
This is a Next.js project, built to display real-time stock information.

Getting Started
First, run the development server:

Bash

npm run dev

# or

yarn dev

# or

pnpm dev

# or

bun dev
Open http://localhost:3000 with your browser to see the result.

You can start editing the page by modifying app/page.tsx. The page auto-updates as you edit the file.

This project uses next/font to automatically optimize and load Geist, a new font family for Vercel.

Using Mock Data for Development
To speed up development and testing, you can use local mock data instead of making real API calls. This makes your application faster and less dependent on an external backend service.

Mock Data File Structure
Mock data is stored in the mocks folder at the root of your project. The names.json file is a valid JSON array containing stock tickers and names.

JSON

[
{
"ticker": "VITEC-B.ST",
"name": "Vitec Software Group AB (publ)"
},
{
"ticker": "VITR.ST",
"name": "Vitrolife AB (publ)"
},
{
"ticker": "VNV.ST",
"name": "VNV Global Ltd"
}
]
How to Use Mock Data
To use the mock data, modify the useFetchStocks.js hook located in app/hooks/.

Import the mock data at the top of the file:

JavaScript

import mockNames from '../../mocks/names.json';
Replace the real API call inside the useEffect hook. Comment out the original fetch call and use setStocks directly with the imported data.

JavaScript

useEffect(() => {
const fetchStocks = async () => {
try {
// Use mock data for a faster response
setStocks(mockNames as Stock[]);
setLoading(false);

            /* To switch back to the real API, uncomment the code below:
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/stocks/names`);
            if (!response.ok) {
                throw new Error("Failed to fetch stocks");
            }
            const data = await response.json();
            setStocks(data);
            */
        } catch (err) {
            setError("Something went wrong");
            setStocks(null);
        } finally {
            setLoading(false);
        }
    };

    fetchStocks();

}, []);
By following these steps, your application will load stock data instantly without needing a running backend server. When you're ready to connect to your live API, simply revert the changes.

Using Mock Data in Your useStocks Hook
For local development and testing, you can use mock data to avoid making real API calls to your backend. This allows your application to run without a live server.

Create your Mock Data File: Place a details.json file in your mocks directory. This file should be a JSON array of objects, with each object representing a single stock's details.

mocks/details.json

JSON

[
{
"ticker": "VITEC-B.ST",
"name": "Vitec Software Group AB (publ)",
"change": 1.5,
"price": 450.50,
"currency": "SEK",
"metrics": {
"market_cap": 15000000000,
"trailing_pe": 25.5
},
"priceHistory": [445.0, 448.2, 450.5]
},
{
"ticker": "VITR.ST",
"name": "Vitrolife AB (publ)",
"change": -0.8,
"price": 520.75,
"currency": "SEK",
"metrics": {
"market_cap": 22000000000,
"trailing_pe": 30.1
},
"priceHistory": [525.0, 522.1, 520.75]
}
]
Modify the useStocks Hook: In your app/hooks/useStocks.js file, you will import the mock data and use it to simulate the API response.

Import the mock data at the top of the file:

JavaScript

import mockDetails from '../../mocks/details.json';
Replace the Promise.all block with the following code. This new logic filters the mock data to return only the stocks requested by the tickers array, mimicking the behavior of your real API.

JavaScript

useEffect(() => {
setLoading(true);
if (tickers.length === 0) {
setStocks([]);
setLoading(false);
return;
}

    // Using mock data for development
    const filteredStocks = mockDetails.filter(stock =>
        tickers.includes(stock.ticker)
    );

    setStocks(filteredStocks);
    setLoading(false);

    /* Uncomment this block to use the real API:
    Promise.all(
      tickers.map((ticker) => {
        return fetch(
          `https://stockdata-api-rk1o.onrender.com/api/stocks/details/${ticker}`
        ).then((response) => {
          if (!response.ok) {
            throw new Error("Failed to retrieve stocks");
          }
          return response.json();
        });
      })
    )
    .then((result) => {
      setStocks(result);
    })
    .catch((err) => {
      if (err instanceof Error && err.message === "Failed to retrieve stocks") {
        setError("Could not reach the server");
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    })
    .finally(() => setLoading(false));
    */

}, [tickers]);

return { stocks, error, loading };
};

export default useStocks;

By following these steps, your app will load stock details from the local details.json file, allowing you to work on UI and logic without a live backend connection.
