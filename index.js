const express = require('express');

const {connectToDb} = require("./database");
const app = express();
const port = 3000;
const cors = require('cors');

app.use(cors())

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


app.get('/api/players/:search', async (req, res) => {
    try {

        const db = await connectToDb();
        const players = db.collection("player")

        res.json(await players.find({
            "name": {
                $regex: req.params.search,
                $options: "i"
            }
        }).toArray());

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

app.get('/api/players/sorted/:art/:type', async (req, res) => {
    console.log("sort")
    try {

        const db = await connectToDb();
        const players = db.collection("player")



        switch (req.params.art){
            case "age":
                res.json(await players.find({}).sort({age: req.params.type}).toArray());
                break;
            case "marketValue":
                res.json(await players.find({}).sort({market_value: req.params.type}).toArray());
                break;
            case "name":
                res.json(await players.find({}).sort({name: req.params.type}).toArray());
                break;
            case "team":
                res.json(await players.find({}).sort({team: req.params.type}).toArray());
                break;
            case "nationality":
                res.json(await players.find({}).sort({nationality: req.params.type}).toArray());
                break;
            default:
                break;
        }



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
