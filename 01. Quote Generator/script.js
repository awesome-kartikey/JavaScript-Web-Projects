// Get DOM Elements
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

// Get Quote from API
let apiQuotes = [];

// Show Loading
function showLoading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

// Hide Loading
function hideLoading() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}

// New Quote
function newQuote(quoteData) {
  // Check if Author field is blank and replace it with 'Unknown'
  const author = quoteData.quoteAuthor === '' ? 'Unknown' : quoteData.quoteAuthor;
  
  // Check Quote length to determine styling
  if (quoteData.quoteText.length > 120) {
    quoteText.classList.add('long-quote');
  } else {
    quoteText.classList.remove('long-quote');
  }
  // Set Quote, Hide Loader
  quoteText.textContent = quoteData.quoteText;
  authorText.textContent = author;
  hideLoading();
}

async function getQuote() {
  const apiUrl = "http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";
  const proxyUrl = "https://cors-anywhere.herokuapp.com/";
  showLoading();
  try {
    const response = await fetch(proxyUrl + apiUrl);
    const data = await response.json();
    newQuote(data);
  } catch (error) {
    console.log("whoops, no quote", error);
    getQuote(); // Try again if there's an error
  }
}

// On Load
getQuote();

// Tweet Quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, '_blank');
}

// Event Listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);