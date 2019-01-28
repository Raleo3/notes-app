const express = require('express');
const router = express.Router();
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('db.json');
const db = low(adapter);

/* GET notes. */
router.get('/', (req, res) => {
  const notes = db.get('notes').value();
  if (notes) {
    return res.status(200).send(notes);
  }

  throw new Error("Server Error");
});

/* GET Individual note. */
router.get('/:noteId', (req, res) => {
  const note = db.get('notes').find({ id: req.params.noteId }).value();
  if (note) {
    return res.status(200).send(note);
  }

  throw new Error("Server Error");
});

/* PUT Individual note. */
router.put('/:noteId', (req, res) => {
  const note = req.body;
  note.editMode = false;

  const updatedNote = db.get('notes').find({ id: req.params.noteId }).assign(note).write();
  if (updatedNote) {
    res.status(200).send(updatedNote);
  }

  throw new Error("Server Error");
});


/* POST Individual note. */
router.post('/:noteId', (req, res) => {
  console.log('create req', req.body);
  const note = req.body;

  const notes = db.get('notes').push(note).write();
  if (notes) {
    res.status(200).send(notes);
  }

  throw new Error("Server Error");
});

module.exports = router;
