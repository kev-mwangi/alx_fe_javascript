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