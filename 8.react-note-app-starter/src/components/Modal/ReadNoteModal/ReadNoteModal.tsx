import React from 'react'
import { Note } from '../../../types/note'
import { DeleteBox, FixedContainer } from '../Modal.styles';
import parse from 'html-react-parser';

interface ReadNoteModalProps {
  note: Note;
  type: string
}

const ReadNoteModal = ({ note, type }: ReadNoteModalProps) => {

  return (
    <FixedContainer>
      
    </FixedContainer>
  )
}

export default ReadNoteModal;