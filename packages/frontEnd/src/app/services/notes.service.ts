import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

import { Note } from '../notes/notes.interface';

@Injectable()
export class NotesService {
  constructor(private http: HttpClient) {}

  getNotes() {
    return this.http.get(environment.baseURL + 'notes')
      .pipe(
        catchError(error => error)
      );
  }

  getNote(id: number) {
    return this.http.get(environment.baseURL + `notes/${id}`)
      .pipe(
        catchError(error => error)
      );
  }

  updateNote(note: Note) {
    return this.http.put(environment.baseURL + `notes/${note.id}`, note)
      .pipe(
        catchError(error => error)
      );
  }

  createNote(note: Note) {
    return this.http.post(environment.baseURL + `notes/${note.id}`, note)
      .pipe(
        catchError(error => error)
      );
  }
}
