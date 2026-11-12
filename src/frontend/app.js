let cards = [];
let currentIndex = 0;

async function loadCards() {
    const response = await fetch('http://localhost:5000/api/flashcards');
    cards = await response.json();
    showCard(0);
}

function showCard(index) {
    if (cards.length === 0) return;
    currentIndex = index % cards.length;
    document.getElementById('category').innerText = cards[currentIndex].category;
    document.getElementById('question').innerText = cards[currentIndex].question;
    document.getElementById('answer').innerText = cards[currentIndex].answer;
    document.getElementById('answer').classList.add('hidden');
    document.getElementById('btn-toggle').innerText = "Ukaž odpověď";
}

document.getElementById('btn-toggle').addEventListener('click', () => {
    const ans = document.getElementById('answer');
    ans.classList.toggle('hidden');
    document.getElementById('btn-toggle').innerText = ans.classList.contains('hidden') ? "Ukaž odpověď" : "Skryj odpověď";
});

document.getElementById('btn-next').addEventListener('click', () => {
    showCard(currentIndex + 1);
});

loadCards();