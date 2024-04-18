const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;
const sqlite3 = require('sqlite3').verbose();
let db;

app.use(bodyParser.json());
app.use(express.static('public'));

// Endpoint to get all recipes
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

// Endpoint to search for recipes
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

// Endpoint to add a new recipe
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
    // Connect to the SQLite database when the server starts
    db = new sqlite3.Database('./cookbook.db', sqlite3.OPEN_READWRITE, (err) => {
        if (err) {
            console.error(err.message);
        } else {
            console.log('Connected to the SQLite database.');
        }
    });
});
