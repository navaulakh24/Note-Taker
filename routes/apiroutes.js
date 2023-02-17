const path = require('path');
const fs= require('fs');
const router = require('express').Router();
let dbData = require('../db/db.json');

var uniqid= require('uniqid');

    router.get('/notes', (req, res) => {
        fs.readFile('../db/db.json', 'utf8', (err, data) => {
            if(err) {
                console.log(err);
            } else {
                res.json(JSON.parse(data));
            }
        })
    });



    router.post('/notes', (req, res) => {
        const { title, text } = req.body;
        if(title && text) {
            const newNote = {
                title, 
                text,
                id: uniqid()
            }
            fs.readFile("../db/db.json", 'utf8', (err, data) => {
                if(err) {
                    console.log(err);
                } else {
                    const parsedNotes = JSON.parse(data)
                    parsedNotes.push(newNote)
                    dbData = parsedNotes
                    fs.writeFile("../db/db.json", JSON.stringify(parsedNotes), (err) => {
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
    })




    // router.delete('/notes/:id', (req, res) => {

    // })

    module.exports = router
