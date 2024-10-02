import { RiInboxUnarchiveFill } from 'react-icons/ri';
import { FaEdit, FaTrash, FaTrashRestore } from "react-icons/fa";
import { Note } from "../types/note";
import { Dispatch } from "@reduxjs/toolkit";
import { NotesIconBox } from '../styles/styles';
// import {unarchiveNot } 

const clickHandler = () => {
    dispatchEvent(setEditNote(note));
    dispatchEvent(toggleCreateNoteModal(true));
};

const getRelevantBtns = (type: string, note: Note, dispatch: Dispatch) => {
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