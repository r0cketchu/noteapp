import { RiInboxUnarchiveFill } from 'react-icons/ri';
import { FaEdit, FaTrash, FaTrashRestore, FaArchive } from "react-icons/fa";
import { Note } from "../types/note";
import { Dispatch } from "@reduxjs/toolkit";
import { NotesIconBox } from '../styles/styles';
import { deleteNote, restoreNote, setEditNote, setTrashNotes, unarchiveNote, setArchiveNotes } from '../store/notesList/notesListSlice';
import { toggleCreateNoteModal } from '../store/modal/modalSlice';

const getRelevantBtns = (type: string, note: Note, dispatch: Dispatch) => {

  const clickHandler = () => {
    dispatch(setEditNote(note));  
    dispatch(toggleCreateNoteModal(true));  
  };

  if (type === "archive") {
    return (
      <>
        <NotesIconBox
          onClick={() => dispatch(unarchiveNote(note))}
          data-info="Unarchive"
        >
          <RiInboxUnarchiveFill style={{ fontSize: "1rem" }} />
        </NotesIconBox>
        <NotesIconBox
          onClick={() => dispatch(setTrashNotes(note))}
          data-info="Delete"
        >
          <FaTrash />
        </NotesIconBox>
      </>
    );
  } else if (type === "trash") {
    return (
      <>
        <NotesIconBox
          onClick={() => dispatch(restoreNote(note))}
          data-info="Restore"
        >
          <FaTrashRestore />
        </NotesIconBox>
        <NotesIconBox
          onClick={() => dispatch(deleteNote(note))}
          data-info="Delete"
        >
          <FaTrash />
        </NotesIconBox>
      </>
    );
  } else {
    return (
      <>
        <NotesIconBox data-info="Edit">
          <FaEdit style={{ fontSize: "1rem" }} onClick={clickHandler} />
        </NotesIconBox>
        <NotesIconBox
          onClick={() => dispatch(setArchiveNotes(note))}
          data-info="Archive"
        >
          <FaArchive />
        </NotesIconBox>
        <NotesIconBox
          onClick={() => dispatch(setTrashNotes(note))}
          data-info="Delete"
        >
          <FaTrash />
        </NotesIconBox>
      </>
    );
  }
};

export default getRelevantBtns;
