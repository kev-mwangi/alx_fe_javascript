const QuoteDisplay = document.getElementById("quoteDisplay");
const GenerateQuoteBtn = document.getElementById("newQuote");

// Initialize quotes array - moved to top to avoid reference errors
let quotes = JSON.parse(localStorage.getItem('quotes')) || [
    {
        text: "The best way to get started is to quit talking and begin doing.",
        category: "Motivational"
    },
    {
        text: "Don't let yesterday take up too much of today.",
        category: "Inspirational"
    },
    {
        text: "It's not whether you get knocked down, it's whether you get up.",
        category: "Resilience"
    },
    {
        text: "The only way to do great work is to love what you do.",
        category: "Motivation"
    },
    {
        text: "Innovation distinguishes between a leader and a follower.",
        category: "Leadership"
    },
    {
        text: "Life is what happens to you while you're busy making other plans.",
        category: "Life"
    }
];

// Fixed showRandomQuote function
function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
    QuoteDisplay.innerHTML = `<p>"${randomQuote.text}"</p><p><em>- ${randomQuote.category}</em></p>`;
    
    // Save to localStorage
    localStorage.setItem("savedQuote", JSON.stringify(randomQuote));
}

// Fixed createAddQuoteForm function
function createAddQuoteForm() {
    const newQuoteText = document.getElementById("newQuoteText").value;
    const newQuoteCategory = document.getElementById("newQuoteCategory").value;
    
    if (newQuoteText && newQuoteCategory) {
        const newQuote = {
            text: newQuoteText,
            category: newQuoteCategory
        };
        quotes.push(newQuote);
        
        // Save updated quotes to localStorage
        localStorage.setItem('quotes', JSON.stringify(quotes));
        
        // Clear form fields
        document.getElementById("newQuoteText").value = "";
        document.getElementById("newQuoteCategory").value = "";
        
        alert("Quote added successfully!");
    } else {
        alert("Please fill in both quote text and category.");
    }
}

function exportToJSON() {
    const dataStr = JSON.stringify(quotes, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);  
    const a = document.createElement("a");
    a.href = url;
    a.download = "quotes.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

function populateCategories() {
    const categories = [];
    for (let i = 0; i < quotes.length; i++) {
        // Remove duplicates using Set
        if (!categories.includes(quotes[i].category)) {
            categories.push(quotes[i].category);
        }
    }
    console.log(categories);
    return categories;
}
function JSONplaceholder() {
    // Placeholder function for JSON import
}


async function fetchQuotesFromServer() {
    try {
        console.log("🔄 Fetching from quotes.json...");
        
        // Fetch from your actual quotes.json file in the repo
        const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            // Add timeout to simulate real API behavior
            signal: AbortSignal.timeout(3000)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const quotesFromServer = await response.json();
        
        // Get a random quote from the server response
        const randomIndex = Math.floor(Math.random() * quotesFromServer.length);
        const quoteData = quotesFromServer[randomIndex];
        quoteData.source = "quotes.json (server)";
        quoteData.fetchedAt = new Date().toISOString();

        // Update localStorage with fresh data from server
        localStorage.setItem("quotes", JSON.stringify(quotesFromServer));
        localStorage.setItem("lastServerFetch", new Date().toISOString());
        
        console.log("✅ Successfully fetched from quotes.json");
        return quoteData;

    } catch (error) {
        console.warn("❌ Failed to fetch from quotes.json, using localStorage:", error.message);
        return getQuoteFromLocalStorage();
    }
}

function getQuoteFromLocalStorage() {
    // Try to get quotes from localStorage
    const storedQuotes = localStorage.getItem("quotes");
    
    if (storedQuotes) {
        const quotes = JSON.parse(storedQuotes);
        if (quotes.length > 0) {
            const randomIndex = Math.floor(Math.random() * quotes.length);
            const quote = quotes[randomIndex];
            quote.source = "localStorage";
            return quote;
        }
    }
    
    // Ultimate fallback - hardcoded quotes
    console.warn("No quotes found in localStorage, using fallback quotes");
    const fallbackQuotes = [
        {
            text: "The best way to get started is to quit talking and begin doing.",
            category: "Motivational",
            source: "fallback"
        },
        {
            text: "Don't let yesterday take up too much of today.",
            category: "Inspirational", 
            source: "fallback"
        }
    ];
    
    return fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)];
}


// Sycn Quotes function
async function syncQuotes() {

    const lastFetch = localStorage.getItem("quotes");
    const now = new Date();


    if (!lastFetch || (now - new Date(lastFetch)) > 24 * 60 * 60 * 1000) {
        console.log("Syncing quotes from server...");
        const fetchedQuote = await fetchQuotesFromServer();
        console.log("Fetched Quote:", fetchedQuote);
    }

    

}

// Event listener for DOM content loaded
window.addEventListener("DOMContentLoaded", () => {
    const savedQuote = localStorage.getItem("savedQuote");
    if (savedQuote) {
        const quoteObj = JSON.parse(savedQuote);
        QuoteDisplay.innerHTML = `<p>"${quoteObj.text}"</p><p><em>- ${quoteObj.category}</em></p>`;
    } else {
        showRandomQuote(); 
    }
    
    // Add event listener to generate quote button
    if (GenerateQuoteBtn) {
        GenerateQuoteBtn.addEventListener("click", showRandomQuote);
    }
});