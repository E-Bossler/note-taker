// MODULES 

const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();



const PORT = process.env.PORT || 7070

const notes = require('./db/db.json');

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("../public"))

// HTML ROUTES

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'))
})

// API ROUTES

app.get('/api/notes', (req, res) => {
    return res.json(notes);
});

app.post('/api/notes', (req, res) => {
    const newNote = req.body;
    newNote.id = Math.floor(Math.random() * 100000);
    notes.push(newNote);
    res.send(notes);
    fs.writeFile("./db/db.json", JSON.stringify(notes), err => {
        if (err) throw err;
    });
    console.log("Note saved");
    console.log(notes);
});

app.delete('/api/notes/:id', (req, res) => {
    const noteIDToDelete = req.params.id;
    console.log(noteIDToDelete);
    for (let i=0; i < notes.length; i++ ) {
        if (noteIDToDelete == notes[i].id) {
            notes.splice(i, 1);
            res.send(notes)
            fs.writeFile('./db/db.json'), JSON.stringify(notes), err => {
                if (err) throw err;
            }
            console.log('Note deleted.')
        } else {
            console.log('something happened. The ID did not match')
        }
       
    }
});

// SERVER INITIALIZATION
app.listen(PORT, () => {
    console.log(`Hello, this application is running on port number ${PORT}. Have a wonderful day!`)
});

// asdf