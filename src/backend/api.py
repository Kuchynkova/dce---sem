from flask import Flask, jsonify, request
from flask_cors import CORS
import psycopg2

app = Flask(__name__)
CORS(app)

def get_db_connection():
    return psycopg2.connect(
        host="postgresqldb",
        database="test_db",
        user="root",
        password="root"
    )

# Původní endpoint pro načtení kartiček
@app.route('/api/flashcards', methods=['GET'])
def get_flashcards():
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('SELECT id, question, answer, category FROM flashcards;')
    cards = cur.fetchall()
    cur.close()
    conn.close()

    flashcards_list = []
    for card in cards:
        flashcards_list.append({
            'id': card[0],
            'question': card[1],
            'answer': card[2],
            'category': card[3]
        })

    return jsonify(flashcards_list)

# NOVÝ endpoint pro vytvoření kartičky
@app.route('/api/flashcards', methods=['POST'])
def add_flashcard():
    data = request.get_json()
    
    # Bezpečné načtení dat z požadavku
    question = data.get('question')
    answer = data.get('answer')
    category = data.get('category', 'Vlastní') # Pokud nepřijde kategorie, dáme výchozí

    if not question or not answer:
        return jsonify({'error': 'Otázka a odpověď jsou povinné'}), 400

    conn = get_db_connection()
    cur = conn.cursor()
    
    # %s slouží jako ochrana proti SQL injection
    cur.execute(
        'INSERT INTO flashcards (question, answer, category) VALUES (%s, %s, %s) RETURNING id;',
        (question, answer, category)
    )
    new_id = cur.fetchone()[0]
    
    # Musíme změny potvrdit
    conn.commit()
    cur.close()
    conn.close()

    return jsonify({'id': new_id, 'message': 'Kartička úspěšně přidána!'}), 201

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)