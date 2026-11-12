DROP TABLE IF EXISTS flashcards;

CREATE TABLE flashcards (
    id SERIAL PRIMARY KEY,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    category VARCHAR(50)
);