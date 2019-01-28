import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { of } from 'rxjs';

import { Note } from '../notes/notes.interface';

@Injectable()
export class NotesService {

  public notes: Array<Note> = [{
    id: 1,
    title: 'Trash',
    message: 'Take out the trash',
    editMode: false
  }, {
    id: 2,
    title: 'Play with Dog',
    message: 'It is fun to do',
    editMode: false
  }, {
    id: 3,
    title: 'Write',
    message: 'Start writing your novel',
    editMode: false
  }];

  constructor(private http: HttpClient) {}

  getNotes() {
    return of(this.notes);
    // return this.http.get('http://localhost:3000/users')
    //   .pipe(
    //     map(res => res),
    //     catchError((error) => error);
    //   )
  }

  getNote(id: number) {
    const note = this.notes.find(n => n.id === id);
    return of(note);
  }

  updateNote(note: Note) {
    return of(note);
  }

  createNote(note: Note) {
    return of(note);
  }
}
