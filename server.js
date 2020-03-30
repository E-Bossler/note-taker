// MODULES 

const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 7070

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const notes = require('./db/db.json');

// HTML ROUTES

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
});

app.get('/notes', (req,res) => {
    res.sendFile(path.join(__dirname,'/public/notes.html'))
})

// API ROUTES

app.get('/api/notes', (req,res) => {
    return res.json(notes);
});

app.post('/api/notes', (req,res) => {
    
});

app.delete('/api/notes/:id', (req,res) => {
    
});

// SERVER INITIALIZATION
app.listen(PORT, () => {
    console.log(`Hello, this application is running on port number ${PORT}. Have a wonderful day!`)
});

// asdf