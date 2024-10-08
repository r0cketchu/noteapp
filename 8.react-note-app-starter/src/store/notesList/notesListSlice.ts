import { createSlice } from "@reduxjs/toolkit";
import notes from "../../notesData";
import { Note } from "../../types/note";

enum noteType {
  archiveNotes = 'archiveNotes',
  trashNotes = 'trashNotes',
  mainNotes = 'mainNotes',
}

interface NoteState {
  mainNotes: Note[],
  archiveNotes: Note[],
  trashNotes: Note[],
  editNote: null | Note
}

const initialState: NoteState = {
  mainNotes: [...notes],
  archiveNotes: [],
  trashNotes: [],
  editNote: null
}

const notesListSlice = createSlice({
  name: "notesList",
  initialState,
  reducers: {
    removeTags: (state, { payload }) => {
      state.mainNotes = state.mainNotes.map((note) => ({
        ...note,
        tags: note.tags.filter(({ tag }) => tag !== payload.tag),
      }));
    },
    
    setMainNotes: (state, { payload }) => {
      if (state.mainNotes.find(({ id }) => id === payload.id)) {
        state.mainNotes = state.mainNotes.map((note) =>
          note.id === payload.id ? payload : note
        );
      } else {
        state.mainNotes.push(payload);
      }
    },

    setArchiveNotes: (state, { payload }) => {
      state.mainNotes = state.mainNotes.filter(({ id }) => id !== payload.id);
      state.archiveNotes.push({ ...payload, isPinned: false });
    },

    setTrashNotes: (state, { payload }) => {
      state.mainNotes = state.mainNotes.filter(({ id }) => id !== payload.id);
      state.archiveNotes = state.archiveNotes.filter(({ id }) => id !== payload.id);
      state.trashNotes.push({ ...payload, isPinned: false });
    },

    unarchiveNote: (state, { payload }) => {
      state.archiveNotes = state.archiveNotes.filter(({ id }) => id !== payload.id);
      state.mainNotes.push(payload);
    },

    restoreNote: (state, { payload }) => {
      state.trashNotes = state.trashNotes.filter(({ id }) => id !== payload.id);
      state.mainNotes.push(payload);
    },

    deleteNote: (state, { payload }) => {
      state.trashNotes = state.trashNotes.filter(({ id }) => id !== payload.id);
    },

    setPinnedNotes: (state, { payload }) => {
      state.mainNotes = state.mainNotes.map((note) =>
        note.id === payload.id ? { ...note, isPinned: !note.isPinned } : note
      );
    },

    setEditNote: (state, { payload }) => {
      state.editNote = payload;
    },

    readNote: (state, { payload }) => {
      const { type, id } = payload;

      const setRead = (notes: Note[]) => {
        return notes.map((note: Note) =>
          note.id === id ? { ...note, isRead: !note.isRead } : note
        );
      }

      if (type === 'archive') {
        state.archiveNotes = setRead(state.archiveNotes);
      } else if (type === 'trash') {
        state.trashNotes = setRead(state.trashNotes);
      } else {
        state.mainNotes = setRead(state.mainNotes);
      }
    }
  }
});

export const {
  setMainNotes,
  setArchiveNotes,
  setTrashNotes,
  unarchiveNote,
  restoreNote,
  deleteNote,
  setPinnedNotes,
  setEditNote,
  readNote,
  removeTags,
} = notesListSlice.actions;

export default notesListSlice.reducer;
