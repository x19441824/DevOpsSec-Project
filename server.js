const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;
const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('./cookbook.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      console.error(err.message);
    }
  });

app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));



app.get('/recipes', (req, res) => {
    db.all("SELECT * FROM recipes", [], (err, rows) => {
        if (err) {
            res.status(400).json({"error": err.message});
            return;
        }
        res.json({
            "message": "success",
            "data": rows
        });
    });
});

app.get('/add-recipe', function(req, res) {
    res.sendFile('add-recipe.html', { root: 'public' });
});

app.get('/', (req, res) => {
    res.sendFile('index.html', { root: './public' });
});

app.get('/favicon.ico', (req, res) => {
    res.sendFile('favicon.ico', { root: 'public' });
});

app.get('/search', (req, res) => {
    let query = req.query.query;
    db.all("SELECT * FROM recipes WHERE title LIKE ? OR ingredients LIKE ? OR description LIKE ?", [`%${query}%`, `%${query}%`, `%${query}%`], (err, rows) => {
        if (err) {
            res.status(400).json({"error": err.message});
            return;
        }
        if (rows.length === 0) {
            res.json({
                "message": "Recipe not found",
                "data": []
            });
        } else {
            res.json({
                "message": "success",
                "data": rows
            });
        }
    });
});

app.post('/recipes', (req, res) => {
    const { title, description, ingredients, preparation_time, difficulty } = req.body;
    const sql = 'INSERT INTO recipes (title, description, ingredients, preparation_time, difficulty) VALUES (?,?,?,?,?)';
    db.run(sql, [title, description, ingredients, preparation_time, difficulty], function(err) {
        if (err) {
            res.status(400).json({"error": err.message});
            return;
        }
        res.json({
            "message": "success",
            "data": this.lastID
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    db = new sqlite3.Database('./cookbook.db', sqlite3.OPEN_READWRITE, (err) => {
        if (err) {
            console.error(err.message);
        } else {
            console.log('Connected to the SQLite database.');
        }
    });
});

module.exports = app;  // `app` is the instance of your Express application

function closeDatabase() {
    return new Promise((resolve, reject) => {
      db.close((err) => {
        if (err) reject(err);
        else resolve();
      });
    });
  }
  
  // Export the close function
  module.exports = { app, closeDatabase };
  
