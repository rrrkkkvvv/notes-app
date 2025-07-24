import { nanoid } from "nanoid";
import { createSlice } from "../../../app/store/lib/createSlice";
import type { TAction } from "../../../app/store/lib/types";
import { getState, type AppThunk } from "../../../app/store/store";
import type {
  TNewNote,
  TNote,
  TNotesList,
  TUpdatedNote,
} from "../../../shared/types/EntityTypes";
import { getNotesLS, setNotesLS } from "../../../shared/utils/localStorage";

type TInitialState = {
  notes: TNotesList | null;
};
const initialState: TInitialState = {
  notes: getNotesLS(),
};

const noteSlice = createSlice({
  name: "notesState",
  initialState,
  reducers: {
    setNotes: (state, action: TAction<"SET_NOTES", TNotesList>) => ({
      ...state,
      notes: action.payload,
    }),
  },
  selectors: {
    selectNotes: (state) => state.notes,
  },
});
export const selectNoteById = (id: string) =>
  getState().notesState.notes?.find((note) => note.id === id);
const { setNotes } = noteSlice.actions;
export const { selectNotes } = noteSlice.selectors;

export const addNote =
  (newNoteFields: TNewNote): AppThunk =>
  async (dispatch, getState) => {
    const { text, title, categoryKey } = newNoteFields;
    const notes = getState().notesState.notes;

    if (!title.trim().length || !text.trim().length) return;

    let date = new Date().toLocaleString();
    const newNote = {
      id: nanoid(),
      title,
      text,
      date,
      categoryKey,
    };
    let newNotesList = notes ? [...notes, newNote] : [newNote];
    dispatch(setNotes(newNotesList));
    setNotesLS(newNotesList);
  };
export const removeNote =
  (noteId: string): AppThunk =>
  async (dispatch, getState) => {
    const notes = getState().notesState.notes;
    if (!notes) return;
    let newNotesList = notes.filter((note: TNote) => note.id !== noteId);
    dispatch(setNotes(newNotesList));
    setNotesLS(newNotesList);
  };
export const updateNote =
  (updatedNoteFields: TUpdatedNote): AppThunk =>
  async (dispatch, getState) => {
    const notes = getState().notesState.notes;
    if (!notes) return;
    let newDate = new Date().toLocaleString();

    let newNotesList = notes.map((note: TNote) => {
      if (note.id !== updatedNoteFields.id) return note;
      return {
        ...note,
        ...updatedNoteFields,
        date: newDate,
      };
    });
    dispatch(setNotes(newNotesList));
    setNotesLS(newNotesList);
  };
export const resetCategoryForNotes =
  (categoryKey: string): AppThunk =>
  async (dispatch, getState) => {
    const notes = getState().notesState.notes;
    if (!notes) return;
    const newNotes = notes.map((note) => {
      if (note.categoryKey === categoryKey) {
        return {
          ...note,
          categoryKey: "all",
        };
      }
      return note;
    });
    dispatch(setNotes(newNotes));
    setNotesLS(newNotes);
  };
export const notesReducer = noteSlice.reducer;
