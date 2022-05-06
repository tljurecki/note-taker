const router = require('express').Router();
const fs = require('fs');
//import unique id from npm
const uniqid = require('uniqid');

function saveToDb (notes) {
    notes = JSON.stringify(notes);
    fs.writeFileSync('./db/db.json', notes, (err) => {
        if (err) {
            return console.log(err);
        }
    });
} 

//Get all saved notes
router.get('/notes', (req, res) => {
   let savedNotes = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));
    res.json(savedNotes);
});

//Post to add notes
router.post('/notes', (req, res) => {
    const addNote = req.body;
    
    addNote.id = uniqid();

   let savedNotes = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));
    //push note in 'db.json'
    savedNotes.push(addNote);

    fs.writeFileSync('./db/db.json', JSON.stringify(savedNotes));

    saveToDb(savedNotes);
    res.json(savedNotes);
   
});

router.delete('/notes/:id', (req, res) => {
    //get id of note to be deleted
    const noteId = req.params.id.toString();
    console.log(noteId);
    let savedNotes = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));
    for(i = 0; i < savedNotes.length; i++) {
        if (savedNotes[i].id == noteId);
        res.send(savedNotes[i]);
        
        savedNotes.splice(i, 1);
        break;
    }

    saveToDb(savedNotes);
;
})

module.exports = router;