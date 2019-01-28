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
  public notes: Array<Note> = []; // TODO: Get this from firebase, via Express
  public newTitle = new FormControl('', [Validators.required]);
  public newMessage = new FormControl('', [Validators.required]);

  constructor(
    private notesService: NotesService
  ) { }

  ngOnInit() {
    this.notesService.getNotes()
      .subscribe(notes => {
          this.notes = notes;
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
      id: mostRecentNote.id + 1,
      title: this.newTitle.value,
      message: this.newMessage.value,
      editMode: false
    };

    this.notesService.createNote(newNote)
      .subscribe(response => {
        // After the network request comes back 200...
        // TODO; Animate for the new note to appear in the list after it persists with the backend...
        this.notes.push(newNote);
        this.resetForm();
      });
    // TODO: Add in request error handling
  }

  enableEdit(id: number) {
    const note = this.notes.find(n => n.id === id);
    note.editMode = true;
    // TODO: Animate the icon change..can you?
  }

  updateNote(id: number, disabled: boolean) {
    if (disabled) {
      return;
    }

    const note = this.notes.find(n => n.id === id);
    this.notesService.updateNote(note)
      .subscribe(response => {
        console.log('update success');
        note.editMode = false;
      });
    // TODO: error handling on failed service call
  }

// I suppose...we should have a note component...and then the note list is made up of all of these note components..
  // Home page will list all notes, and then /:noteId will be individual note
  // Figure out how to server side render the JS...lame...
  // Add in Animations
  // Auto Scroll to bottom of page on note open
  // Add in error handling
  // refactor JS & CSS
  // Set up Express with Firebase...
  // Write the endpoints...
  // Figure out lerna for easy to spin up
  // Figure out env files
  // clean up unecessary code
}
