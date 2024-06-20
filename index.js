const express = require('express');
const app = express();
const port = 3000;

// Middleware, um JSON-Body-Parsing zu ermöglichen
app.use(express.json());

// Beispiel-Route
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// Beispiel-API-Route
app.get('/api', (req, res) => {
    res.json({ message: 'Welcome to the API!' });
});

// Server starten
app.listen(port, () => {
    console.log(`Server läuft auf http://localhost:${port}`);
});
