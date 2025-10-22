const QuoteDisplay= document.getElementById("quoteDisplay");
const GenerateQuoteBtn = document.getElementById("newQuote");


const quotes = [
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
    }
]


function getRandomQuote() {
    for (let i = 0; i < quotes.length; i++) {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        const randomQuote = quotes[randomIndex];
        QuoteDisplay.innerHTML = `<p>"${randomQuote.text}"</p><p><em>- ${randomQuote.category}</em></p>`;
    }

}
function addQuote() {
    const newQuoteText = document.getElementById("newQuoteText").value;
    const newQuoteCategory = document.getElementById("newQuoteCategory").value;
}



console.log(QuoteDisplay)

displayQuote(randomQuote);

  
  localStorage.setItem("savedQuote", JSON.stringify(randomQuote));


window.addEventListener("DOMContentLoaded", () => {
  const savedQuote = localStorage.getItem("savedQuote");
  if (savedQuote) {
    const quoteObj = JSON.parse(savedQuote);
    displayQuote(quoteObj);
  } else {
    getRandomQuote(); 
  }
});


let  =JSON.parse(localStorage.getItem('quotes')) || [
    { text: "The only way to do great work is to love what you do.", author: "Steve Jobs", category: "Motivation" },
    { text: "Innovation distinguishes between a leader and a follower.", author: "Steve Jobs", category: "Leadership" },
    { text: "Life is what happens to you while you're busy making other plans.", author: "John Lennon", category: "Life" }
];

// DOM Elements
const categoryFilter = document.getElementById('categoryFilter');
const quotesContainer = document.getElementById('quotesContainer');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    populateCategories();
    restoreLastFilter();
    displayQuotes();
    
    // Add event listener for category filter
    categoryFilter.addEventListener('change', function() {
        filterQuotes();
        saveLastFilter();
    });
});

// Function to populate categories dynamically
function populateCategories() {
    // Clear existing options except "All Categories"
    while (categoryFilter.children.length > 1) {
        categoryFilter.removeChild(categoryFilter.lastChild);
    }
    
    // Get unique categories from quotes
    const categories = [...new Set(quotes.map(quote => quote.category))];
    
    // Add categories to dropdown
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
    });
}

// Function to filter quotes based on selected category
function filterQuotes() {
    const selectedCategory = categoryFilter.value;
    displayQuotes(selectedCategory);
}

// Function to display quotes (with optional filtering)
function displayQuotes(category = 'all') {
    quotesContainer.innerHTML = '';
    
    const filteredQuotes = category === 'all' 
        ? quotes 
        : quotes.filter(quote => quote.category === category);
    
    if (filteredQuotes.length === 0) {
        quotesContainer.innerHTML = '<p>No quotes found for the selected category.</p>';
        return;
    }
    
    filteredQuotes.forEach((quote, index) => {
        const quoteElement = document.createElement('div');
        quoteElement.className = 'quote';
        quoteElement.innerHTML = `
            <p>"${quote.text}"</p>
            <p><strong>- ${quote.author}</strong>
               <span class="category">${quote.category}</span>
            </p>
            <button onclick="deleteQuote(${index})">Delete</button>
        `;
        quotesContainer.appendChild(quoteElement);
    });
}

// Function to remember the last selected filter
function saveLastFilter() {
    localStorage.setItem('lastSelectedCategory', categoryFilter.value);
}

function restoreLastFilter() {
    const lastCategory = localStorage.getItem('lastSelectedCategory');
    if (lastCategory) {
        categoryFilter.value = lastCategory;
        filterQuotes();
    }
}

// Enhanced addQuote function (update this if you have an existing one)
function addQuote(text, author, category) {
    const newQuote = { text, author, category };
    quotes.push(newQuote);
    
    // Save to localStorage
    localStorage.setItem('quotes', JSON.stringify(quotes));
    
    // Update categories if new category is introduced
    updateCategoriesIfNew(category);
    
    // Refresh display
    filterQuotes();
}

// Helper function to update categories if a new one is added
function updateCategoriesIfNew(category) {
    const existingCategories = [...categoryFilter.options].map(option => option.value);
    
    if (!existingCategories.includes(category)) {
        // Add new category to dropdown
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
    }
}

// Function to delete a quote (optional enhancement)
function deleteQuote(index) {
    if (confirm('Are you sure you want to delete this quote?')) {
        quotes.splice(index, 1);
        localStorage.setItem('quotes', JSON.stringify(quotes));
        
        // Refresh categories and display
        populateCategories();
        filterQuotes();
    }
}