const express = require('express');

const {connectToDb} = require("./database");
const app = express();
const port = 3000;

//const morgan = require('morgan');

/*// Middleware
app.use(morgan('dev'));
app.use(express.json());*/


// Route zum Abrufen aller Spieler
app.get('/api/players', async (req, res) => {
    try {
        const db = await connectToDb();
        const players = db.collection("player")
        res.json(await players.find({}).toArray());
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Route zum Abrufen aller Teams
app.get('/api/teams', async (req, res) => {
    try {
        const db = await connectToDb();
        const teams = db.collection("team")
        res.json(await teams.find({}).toArray());
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Route zum Abrufen aller Teams
app.get('/api/games', async (req, res) => {
    try {
        const db = await connectToDb();
        const games = db.collection("game")
        res.json(await games.find({}).toArray());
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});



/*// Route zum Abrufen eines einzelnen Spielers
app.get('/api/players/:id', async (req, res) => {
    try {
        const player = await Player.findById(req.params.id);
        if (!player) {
            return res.status(404).json({ message: 'Player not found' });
        }
        res.json(player);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});*/

// Server starten
app.listen(port, () => {
    console.log(`Server läuft auf http://localhost:${port}`);
});
