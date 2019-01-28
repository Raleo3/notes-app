const express = require('express');
const router = express.Router();
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
//
const adapter = new FileSync('db.json');
const db = low(adapter);
// Get all Notes
// Get single note
// Update Single note
// Create a new note...

/* GET users listing. */
router.get('/', (req, res, next) => {
  // res.send('respond with notes resource');
  const notes = db.get('notes').value();
  console.log('notes', notes);
  res.send(notes);
  // THIS WORKS...
});

router.get('/:id', (req, res, next) => {

});

module.exports = router;

// Render vs. send....
