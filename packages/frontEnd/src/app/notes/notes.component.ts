import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { NotesService } from '../services/notes.service';
import { Note } from './notes.interface';

import * as _ from 'lodash';

const BUTTON_TEXT = {
  add: 'Add a Note',
  save: 'Save Note'
};

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NotesComponent implements OnInit {
  public displayNoteForm = false;
  public buttonText = BUTTON_TEXT.add;
  public notes: Array<Note> = [];
  public newTitle = new FormControl('', [Validators.required]);
  public newMessage = new FormControl('', [Validators.required]);

  constructor(
    private notesService: NotesService
  ) { }

  // Receive as string, convert to number, use as number, send as a string
  ngOnInit() {
    this.notesService.getNotes()
      .subscribe(notes => {
          this.notes = notes.map(note => {
            note.id = parseInt(note.id, 10);
            return note;
          });
      });
  }

  getTitleErrorMessage() {
    return this.newTitle.hasError('required') ? 'You must enter a value' : '';
  }

  getNoteErrorMessage() {
    return this.newMessage.hasError('required') ? 'You must enter a value' : '';
  }

  cancelNote() {
    this.resetForm();
  }

  resetForm() {
    this.newTitle.patchValue('');
    this.newTitle.markAsUntouched();

    this.newMessage.patchValue('');
    this.newMessage.markAsUntouched();

    this.displayNoteForm = false;
    this.buttonText = BUTTON_TEXT.add;
  }

  addNote() {
    if (!this.displayNoteForm) {
      this.buttonText = BUTTON_TEXT.save;
      this.displayNoteForm = true;
      // TODO: scroll to Form...
      return;
    }
    // TODO: add animation for form to appear

    const mostRecentNote = _.sortBy(this.notes, 'id').pop();
    const newNote: Note = {
      id: (mostRecentNote.id + 1).toString(),
      title: this.newTitle.value,
      message: this.newMessage.value,
      editMode: false
    };

    this.notesService.createNote(newNote)
      .subscribe(createdNote => {
        console.log('createdNote', createdNote);
        newNote.id = parseInt(newNote.id, 10);
        this.notes.push(newNote);
        console.log('this.notes', this.notes);
        this.resetForm();
        // TODO; Animate for the new note to appear in the list after it persists with the backend...
      });
    // TODO: Add in request error handling
  }

  enableEdit(id: number) {
    const note = this.notes.find(n => n.id === id);
    note.editMode = true;
    // TODO: Animate the icon change..can you?
  }

  // Auto Scroll to bottom of page on note open
  // Remove extra packages/uneeded code
  // Add in Animations
  // Add in error handling for network calls
}
