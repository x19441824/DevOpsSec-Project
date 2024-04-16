const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('./cookbook.db', (err) => {
    if (err) {
        console.error(err.message);
        throw err;
    } else {
        console.log('Connected to the SQLite database.');
        db.run(`CREATE TABLE IF NOT EXISTS recipes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT,
            description TEXT,
            ingredients TEXT,
            preparation_time INTEGER,
            difficulty TEXT
        )`, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log('Table is created');
            }
        });
    }
});

db.close();
