const router = require('express').Router();
const fs = require('fs');
//import unique id from npm
const uniqid = require('uniqid');

//write notes to db.json
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
    //give each new note a unique id
    addNote.id = uniqid();
    //read data from db.json
   let savedNotes = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));
    //push note in 'db.json'
    savedNotes.push(addNote);

    fs.writeFileSync('./db/db.json', JSON.stringify(savedNotes));
    //send notes to function to save to db.json
    saveToDb(savedNotes);
    res.json(savedNotes);
   
});

//delete items
router.delete('/notes/:id', (req, res) => {
    //get id of note to be deleted
    const noteId = req.params.id.toString();
    console.log(noteId);
    let savedNotes = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));
   //check for matching id in notes array
    for(i = 0; i < savedNotes.length; i++) {
        if (savedNotes[i].id == noteId);
        res.send(savedNotes[i]);
        //removes the deleted note
        savedNotes.splice(i, 1);
        break;
    }
    //write the rest of the files to db.json
    saveToDb(savedNotes);
;
})

module.exports = router;