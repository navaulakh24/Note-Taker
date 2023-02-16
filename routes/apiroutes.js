const path = require('path');
const fs= require('fs');

var uniqid= require('uniqid');

module.exports= (app) => {

    app.get('/api/notes', (req, res) => {
        res.sendFile(path.join(__dirname, '../db/db.json'));
    });



    app.post('/api/notes', (req, res) => {

    })




    app.delete('/api/notes/:id', (req, res) => {

    })
};