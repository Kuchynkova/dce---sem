# Programátorské kartičky

Jednoduchá webová aplikace pro procvičování základů programování pomocí
flashcards. Uživatel může zobrazit otázku, odkrýt odpověď, přejít na další
kartičku a přidat vlastní kartičku uloženou do databáze.

## Spuštění pomocí Dockeru

### Požadavky

- Docker Desktop nebo Docker Engine s příkazem `docker compose`

### Start aplikace

V kořenovém adresáři projektu spusťte:

```bash
docker compose up --build
```

Po dokončení spuštění je aplikace dostupná na:

- webové rozhraní: <http://localhost:8080>
- backend API: <http://localhost:5005/api/flashcards>

Při prvním spuštění se vytvoří PostgreSQL databáze a naplní se základními
kartičkami. Data se ukládají do Docker volume `db_data`, takže zůstávají
zachována i po zastavení kontejnerů.

### Ukončení aplikace

```bash
docker compose down
```

Pro úplné odstranění databáze včetně uložených kartiček použijte:

```bash
docker compose down -v
```

## Funkce

- načtení kartiček z PostgreSQL databáze,
- zobrazení a skrytí odpovědi,
- procházení kartiček pomocí tlačítka **Další otázka**,
- přidání vlastní kartičky s otázkou, odpovědí a kategorií.

## API

- `GET /api/flashcards` – vrátí všechny kartičky,
- `POST /api/flashcards` – vytvoří kartičku.

Příklad těla požadavku `POST`:

```json
{
  "question": "Co vypíše funkce print()?",
  "answer": "Vypíše hodnotu na obrazovku.",
  "category": "Python"
}
```

## Struktura projektu

- `src/frontend/` – HTML a JavaScript webového rozhraní,
- `src/backend/` – Flask API,
- `src/setup/` – SQL skripty pro vytvoření a naplnění databáze,
- `docker-compose.yml` – definice databáze, backendu, frontendu a inicializace.
