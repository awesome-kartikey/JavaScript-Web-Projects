import {localQuotes} from "./quotes.js";

// Cache DOM Elements
const elements = {
  quoteContainer: document.getElementById("quote-container"),
  quoteText: document.getElementById("quote"),
  authorText: document.getElementById("author"),
  twitterBtn: document.getElementById("twitter"),
  newQuoteBtn: document.getElementById("new-quote"),
  loader: document.getElementById("loader"),
};

// API URL
const apiUrl = "http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";

// Check if we're running on GitHub Pages or locally
const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

// Use proxy only for local development, remove it for production (GitHub Pages)
const proxyUrl = isLocalhost ? "https://cors-anywhere.herokuapp.com/" : "";

// The full API endpoint
const apiEndpoint = proxyUrl + apiUrl;

// Toggle Loading State
function toggleLoading(show) {
  elements.loader.hidden = !show;
  elements.quoteContainer.hidden = show;
}

// Display Quote
function displayQuote({ quoteText, quoteAuthor }) {
  if (!quoteText) return;
  
  elements.authorText.textContent = quoteAuthor || "Unknown";
  elements.quoteText.classList.toggle("long-quote", quoteText.length > 120);
  elements.quoteText.textContent = quoteText;
  
  toggleLoading(false);
}

// Get Random Quote from localQuotes array
function getLocalQuote() {
  const randomIndex = Math.floor(Math.random() * localQuotes.length);
  const { text = "No quote available", author = "Unknown" } = localQuotes[randomIndex];
  return { quoteText: text, quoteAuthor: author };
}

// Fetch Quote from API
async function fetchQuote() {
  const response = await fetch(apiEndpoint);
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  return await response.json();
}

// Get Quote (with API or fallback to local quotes)
async function getQuote() {
  toggleLoading(true);
  try {
    const data = await fetchQuote();
    console.log(data);
    displayQuote(data);
  } catch (error) {
    console.warn("Error fetching quote:", error);
    const localQuote = getLocalQuote();
    console.log(localQuote);
    displayQuote(localQuote);
  }
}

// Tweet Quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${elements.quoteText.textContent} - ${elements.authorText.textContent}`;
  window.open(twitterUrl, "_blank");
}

// Event Listeners
elements.newQuoteBtn.addEventListener("click", getQuote);
elements.twitterBtn.addEventListener("click", tweetQuote);

// On Load
getQuote();