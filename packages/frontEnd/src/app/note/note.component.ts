import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { NotesService } from '../services/notes.service';
import { Note } from '../notes/notes.interface';

const BUTTON_TEXT = {
  add: 'Add a Note',
  save: 'Save Note'
};

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NoteComponent implements OnInit {
  @Input() note: Note;

  constructor(
    private route: ActivatedRoute,
    private notesService: NotesService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params.noteId) {
        this.notesService.getNote(parseInt(params.noteId, 10))
          .subscribe((note: Note) => {
              this.note = note;
              this.note.id = parseInt(this.note.id, 10);
          });
      }
   });
  }

  enableEdit(id: number) {
    this.note.editMode = true;
    // TODO: Animate the icon change..can you?
  }

  updateNote(id: number, disabled: boolean) {
    if (disabled) {
      return;
    }

    this.note.id = this.note.id.toString();

    this.notesService.updateNote(this.note)
      .subscribe((updatedNote: Note) => {
        this.note = updatedNote;
        this.note.id = parseInt(this.note.id, 10);
      });
    // TODO: error handling on failed service call
  }
}
