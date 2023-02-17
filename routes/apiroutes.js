//dependencies
const path = require('path');
const fs= require('fs');
const router = require('express').Router();
let dbData = require('../db/db.json');

//package that allows for unique id's to be created
// var uniqid= require('uniqid');

const { v4: uuidv4 } = require('uuid');

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
                id: uuidv4()
            }
            fs.readFile("./db/db.json", 'utf8', (err, data) => {
                if(err) {
                    console.log(err);
                } else {
                    const parsedNotes = JSON.parse(data)
                    parsedNotes.push(newNote)
                    dbData = parsedNotes
                    fs.writeFile("./db/db.json", JSON.stringify(parsedNotes), (err) => {
                        err ? console.error(err) : console.log("Added note")
                    });
                }
            })
            const response = {
                body: newNote
            }
            console.log(response)
            res.json(response)
        } else {
            res.json('Error when adding note')
        }
    });

    router.delete('/notes/:id', (req, res) => {
        fs.readFile('./db/db.json', (err, data) => {
            if(err) {
                console.log(err);
            } else {
                let newData = JSON.parse(data);
                console.log(newData);
                let deleteNotes = newData.filter(item => item.id !== req.params.id);
                console.log(deleteNotes);

                fs.writeFile('./db/db.json', JSON.stringify(deleteNotes), (err, data) => {
                    if(err) {
                        console.log(err);
                    } else {
                        res.json(data);
                    }
                })
            }
        })
    });

    module.exports = router
