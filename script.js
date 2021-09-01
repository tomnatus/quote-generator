
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const quoteAuthor = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

//moet let zijn omdat een lege array is 
let apiQuotes = [];

//Laad nieuwe Quote
function laden () {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

// Verberg lader
function compleet() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}

// Toon nieuwe quote
function nieuweQuote(){
    laden();
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    if(!quote.author){
      quoteAuthor.textContent = "Unknown";  
    }
    else {
    quoteAuthor.textContent = quote.author;
    

    if(quote.text.length > 20){
      quoteText.classList.add('long-quote');
    }
    else {
      quoteText.classList.remove('long-quote');
    }
  }
     quoteText.textContent = quote.text;
     compleet();

}
// Haal quotes op van de api
async function getQuotes(){
  laden();
  const apiUrl = 'https://type.fit/api/quotes';
  try {
     const response = await fetch(apiUrl);
     apiQuotes = await response.json();
     nieuweQuote()
  } catch (error) {
    alert(error);
  }
}

//Twitter de quote
function tweetDeQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${quoteAuthor.textContent}`;
  window.open(twitterUrl, '_blank');
}
// Stel knoppen in
twitterBtn.addEventListener('click',tweetDeQuote);

newQuoteBtn.addEventListener('click',getQuotes);


// Bij het laden
getQuotes();


