from flask import Flask, jsonify
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

@app.route('/api/flashcards')
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

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)