//dependencies
const path = require('path');
const fs= require('fs');
const router = require('express').Router();
let dbData = require('../db/db.json');

//package that allows for unique id's to be created
var uniqid= require('uniqid');

//GET should read the db.json file and return all saved notes as JSON
    router.get('/notes', (req, res) => {
        fs.readFile('./db/db.json', 'utf8', (err, data) => {
            if(err) {
                console.log(err);
            } else {
                res.json(JSON.parse(data));
            }
        })
    });


//POST should receive the new note and add to ds.json file, and return new note 
    router.post('/notes', (req, res) => {
        const { title, text } = req.body;
        if(title && text) {
            const newNote = {
                title, 
                text,
                id: uniqid()
            }
            fs.readFile("./db/db.json", 'utf8', (err, data) => {
                if(err) {
                    console.log(err);
                } else {
                    const parsedNotes = JSON.parse(data)
                    parsedNotes.push(newNote)
                    dbData = parsedNotes
                    fs.writeFile("./db/db.json", JSON.stringify(parsedNotes), (err) => {
                        err ? console.error(err) : console.log("added note")
                    });
                }
            })
            const response = {
                body: newNote
            }
            console.log(response)
            res.json(response)
        } else {
            res.json('error creating notes')
        }
    });




    router.delete('/notes/:id', (req, res) => {
        let notesData = JSON.parse(fs.readFile('./db/db.json', 'utf8'));
        let deleteNotes = notesData.filter(item => item.id !== req.params.id);
        console.log(notesData);
        fs.writeFile('./db/db.json', JSON.stringify(deleteNotes));
        res.json(deleteNotes);
    });

    module.exports = router
