//dependencies
const path = require('path');
const router = require('express').Router();


//should return the notes.html file
    router.get('/notes', (req, res) => {
        res.sendFile(path.join(__dirname, '../public/notes.html'));
    });
//should return the index.html file
    router.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../public/index.html'));
    });

    module.exports = router