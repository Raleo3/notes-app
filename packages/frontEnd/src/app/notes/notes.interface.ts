export interface Note {
  id: any; // Number in the app, string in JSON storage
  title: string;
  message: string;
  editMode: boolean;
}
