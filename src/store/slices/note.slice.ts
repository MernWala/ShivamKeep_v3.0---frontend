import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Note } from '../../schemas/interface';

interface NoteSliceInitialState {
  isLoading: boolean;
  notes: Note[];
  error: string | null;
}

const initialState: NoteSliceInitialState = {
  isLoading: false,
  notes: [],
  error: null,
};

const noteSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    addNote: (state, action: PayloadAction<{note: Note}>) => {
      state.notes.push(action.payload.note);
    },
    loadNotes: (state, action: PayloadAction<{ notes: Note[] }>) => {
      state.notes = action.payload.notes;
    },
    updateNote: (state, action: PayloadAction<{ id: string, note: Note }>) => {
      state.notes = state.notes.map(note => {
        if (note._id === action.payload.id)
          return action.payload.note
        return note;
      })
    },
    deleteNote: (state, action: PayloadAction<{ id: string }>) => {
      state.notes = state.notes.filter(n => n._id !== action.payload.id);
    }
  },
});

export const { addNote, loadNotes, updateNote, deleteNote } = noteSlice.actions;
export default noteSlice.reducer;