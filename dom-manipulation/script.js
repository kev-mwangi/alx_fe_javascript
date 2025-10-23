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
 function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function(event) {
      const importedQuotes = JSON.parse(event.target.result);
      quotes.push(...importedQuotes);
      saveQuotes();
      alert('Quotes imported successfully!');
    };
    fileReader.readAsText(event.target.files[0]);
  }
if (exportquote) {
    const exportquote = JSON.parse(exportquote);
    displayQuote(exportquote);
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