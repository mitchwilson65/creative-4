const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

const mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://localhost:27017/playlists', {
  useNewUrlParser: true
});

const songSchema = new mongoose.Schema({
  title: String,
  artist: String,
  album: String,
  genre: String,
});

// Create models for songs and list in the library
const Song = mongoose.model('Song', songSchema);

// Create a new song in the library
app.post('/api/songs', async (req, res) => {
  const song = new Song({
    title: req.body.title,
    artist: req.body.artist,
    album: req.body.album,
    genre: req.body.genre,
  });
  try {
    await song.save();
    res.send(song);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Get the songs for displaying
app.get('/api/songs', async (req, res) => {
	try {
		let songs = await Song.find();
		res.send(songs);
	} catch(error) {
		console.log(error);
		res.sendStatus(500);
	}
});

// Delete song
app.delete('/api/songs/:id', async (req, res) => {
	try {
		let songs = await Song.deleteOne({ _id: req.params.id });
		res.send(songs);
	} catch (error) {
		console.log(error);
		res.sendStatus(500);
	}
});





const listSchema = new mongoose.Schema({
  title: String,
  artist: String,
  album: String,
  genre: String,
});


const List = mongoose.model('List', listSchema);

// Create a new song in the library
app.post('/api/list', async (req, res) => {
  const list = new List({
    title: req.body.title,
    artist: req.body.artist,
    album: req.body.album,
    genre: req.body.genre,
  });
  try {
    await list.save();
    res.send(list);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Get the songs for displaying
app.get('/api/list', async (req, res) => {
        try {
                let list = await List.find();
                res.send(list);
        } catch(error) {
                console.log(error);
                res.sendStatus(500);
        }
});

// Delete song
app.delete('/api/list/', async (req, res) => {
        try {
                let list = await List.deleteOne();
                res.send(list);
        } catch (error) {
                console.log(error);
                res.sendStatus(500);
        }
});





app.listen(3000, () => console.log('Server listening on port 3000!'));
