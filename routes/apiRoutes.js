const router = require('express').Router();
const fs = require('fs');
//import unique id from npm
const uniqid = require('uniqid');
const savedNotes = require('../db/db.json');


//Get all saved notes
router.get('/notes', (req, res) => {
    savedNotes = JSON.parse(fs.readFileSync('../db/db.json', 'utf8'));
    res.json(savedNotes);
});

//Post to add notes
router.post('/notes', (req, res) => {
    const addNote = req.body;
    
    addNote.id = uniqid();

    savedNotes = JSON.parse(fs.readFileSync('../db/db.json', 'utf8'));
    //push note in 'db.json'
    savedNotes.push(addNote);

    fs.writeFileSync('../db/db.json', JSON.stringify(savedNotes));

    res.json(savedNotes);
   
});

module.exports = router;