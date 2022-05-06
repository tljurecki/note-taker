const router = require('express').Router();
const { response } = require('express');
const fs = require('fs');
const ShortUniqueId = require('short-unique-id');
const savedNotes = require('../db/db.json');


function newNotes(notes) {
    notes = JSON.stringify(notes);
    console.log(notes);

    fs.writeFileSync('./db/db.json', notes, (err) => {
        if (err) {
            return console.log(err);
        }
    });
}

//Get all saved notes
router.get('/notes', (req, res) => {
    res.json(savedNotes);
});

//Post to add notes
router.post('/notes', (req, res) => {
    const addNote = req.body;
    
    addNote.id = new ShortUniqueId();

    let noteObj = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));
    //push note in 'db.json'
    noteObj.push(addNote);

    fs.writeFileSync('./db/db.json', JSON.stringify(noteObj));

    res.json(noteObj);
    newNotes(savedNotes);
});

module.exports = router;