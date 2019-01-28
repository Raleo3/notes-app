import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NotesComponent } from './notes/notes.component';
import { NoteComponent } from './note/note.component';

export const routes: Routes = [
  { path: '', component: NotesComponent }, // TODO: Do I need both??? - NotesListComponent
  { path: ':noteId', component: NoteComponent}, // NoteComponent
  { path: '**', component: NotesComponent } // NotesListComponent
];

@NgModule({
  imports: [RouterModule.forRoot(routes), CommonModule],
  exports: [RouterModule]
})
export class AppRoutingModule {}
