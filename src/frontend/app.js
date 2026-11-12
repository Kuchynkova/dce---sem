let cards = [];
let currentIndex = 0;
const API_URL = 'http://localhost:5000/api/flashcards';

// loadCards nyní umí po uložení přeskočit na nově vytvořenou kartičku
async function loadCards(jumpToLast = false) {
    const response = await fetch(API_URL);
    cards = await response.json();
    
    if (cards.length > 0) {
        if (jumpToLast) {
            showCard(cards.length - 1);
        } else {
            showCard(0);
        }
    }
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

// --- Skrývání a odkrývání formuláře ---
document.getElementById('btn-show-add').addEventListener('click', () => {
    const formContainer = document.getElementById('form-container');
    formContainer.classList.toggle('hidden');
    
    if (formContainer.classList.contains('hidden')) {
        document.getElementById('btn-show-add').innerText = "Přidat vlastní kartičku";
    } else {
        document.getElementById('btn-show-add').innerText = "Zavřít formulář";
    }
});

// --- Ukládání kartičky do DB ---
document.getElementById('add-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const question = document.getElementById('new-question').value;
    const answer = document.getElementById('new-answer').value;
    const category = document.getElementById('new-category').value || 'Vlastní';

    const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question, answer, category })
    });

    if (response.ok) {
        document.getElementById('add-form').reset();
        
        // Po úspěšném uložení formulář automaticky schováme
        document.getElementById('form-container').classList.add('hidden');
        document.getElementById('btn-show-add').innerText = "Přidat vlastní kartičku";

        // Stáhneme aktuální data a rovnou zobrazíme tu novou
        await loadCards(true); 
    } else {
        alert("Chyba při ukládání do databáze.");
    }
});

// Start aplikace
loadCards();