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

  ngOnInit() {
    this.notesService.getNotes()
      .subscribe((notes: Array<Note>) => {
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
      return;
    }

    const mostRecentNote = _.sortBy(this.notes, 'id').pop();
    const newNote: Note = {
      id: (mostRecentNote.id + 1).toString(),
      title: this.newTitle.value,
      message: this.newMessage.value,
      editMode: false
    };

    this.notesService.createNote(newNote)
      .subscribe(createdNote => {
        newNote.id = parseInt(newNote.id, 10);
        this.notes.push(newNote);
        this.resetForm();
      });
  }

  enableEdit(id: number) {
    const note = this.notes.find(n => n.id === id);
    note.editMode = true;
  }
}
