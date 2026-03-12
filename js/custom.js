// API key from Financial Modeling Prep
// This key allows us to access the stock market API

//Jana
// const apiKey = "5kajenyXj8BjQdFU3Wky3cB5bLmHOvML";
//Seth
// const apiKey = "aWDSHsfKRJrRgDepalVNcGG3j2FN6hbj";
//Morgan
// const apiKey = "gnX37xmwbMIikJPAufexgqh11Gc5WZog";

// Array with the Magnificent 7 tech stocks
// We will loop through this list and request data for each stock
const techStocks = ["AAPL", "MSFT", "NVDA", "GOOGL", "AMZN", "META", "TSLA"];

// FUNCTION 1: Make the API call
// This function sends a request to the API to get stock data
// The parameter "symbol" represents the stock ticker (ex: AAPL)
function getStockData(symbol, apiKey) {
  // Build the API URL dynamically using the stock symbol and the API key
  const url = `https://financialmodelingprep.com/stable/historical-price-eod/full?symbol=${symbol}&apikey=${apiKey}`;

  console.log("1. Sending request for:", symbol);
  console.log("Request URL:", url);
  console.log("Symbol:", symbol, "| API key:", apiKey);

  // fetch() sends the request to the API
  fetch(url)
    // Convert the response into JSON format
    .then((response) => response.json())

    // Once we receive the data, send it to the display function
    .then((data) => {
      console.log("3. Parsed JSON for", symbol, "| Raw data:", data);

      displayStock(symbol, data);
    })

    // If something goes wrong, log the error
    .catch((error) => console.log("Error:", error.message));
}
// console.log("is there data", data);

// FUNCTION 2: Display the stock data
// This function receives the stock symbol and the data returned by the API
// It calculates and displays the high and low values
function displayStock(symbol, data) {
  // Get the container element from the HTML
  // This is where we will display the stock information
  const container = document.getElementById("stocks");

  // The API returns historical stock data as an array
  // We store that array in a variable called "history"
  const history = data;

  if (!history || history.length === 0) {
    console.log("No data for", symbol);
    return;
  }
  // Get the most recent trading day's high and low
  // The newest day is usually the first item in the array
  const todayHigh = history[0].high;
  const todayLow = history[0].low;

  // Get approximately one year of trading days (about 252 days)
  const yearData = history.slice(0, 252);

  // Find the highest price within the year
  const yearHigh = Math.max(...yearData.map((day) => day.high));

  // Find the lowest price within the year
  const yearLow = Math.min(...yearData.map((day) => day.low));

  // Add the stock data to the page
  container.innerHTML += `
	<div style= "background-color: lightblue; padding:10px; margin:10px;">
	<h2>${symbol}</h2>
	<p><mark><big><bolder>Day High: ${todayHigh}</bolder></big></mark></p>
	<p><mark>Day Low: ${todayLow}</mark></p>
	<p>Year High: ${yearHigh}</p>
	<p>Year Low: ${yearLow}</p>
	</div>
	`;
}

// LOOP THROUGH ALL TECH STOCK SYMBOLS
// forEach goes through each item in the techStocks array
// and calls getStockData for every stock
techStocks.forEach((stock) => {
  getStockData(stock, apiKey);
});
