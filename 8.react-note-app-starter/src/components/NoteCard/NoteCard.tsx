import { FC } from 'react';
import { NotesIconBox } from '../../styles/styles';
import { Card, ContentBox, FooterBox, TagsBox, TopBox } from './NoteCard.styles';
import { Note } from '../../types/note';
import { BsFillPinFill } from 'react-icons/bs';
import { useAppDispatch } from '../../hooks/redux'; 
import { setPinnedNotes, readNote } from '../../store/notesList/notesListSlice'; 
import parse from 'html-react-parser'; 
import ReadNoteModal from '../Modal/ReadNoteModal/ReadNoteModal';


interface NoteCardProps {
  note: Note;
  type: string;
}

const NoteCard: FC<NoteCardProps> = ({ note, type }) => {
  const { title, content, tags, color, priority, date, isPinned, id, isRead } = note;
  const dispatch = useAppDispatch(); 

 
  const func = () => {
    const imgContent = content.includes("img");
    if (imgContent) {
      return content;
    } else {
      return content.length > 75 ? content.slice(0, 75) + "..." : content;
    }
  };

  return (
    <>
      {isRead && <ReadNoteModal note={note} type={type} />} 

      <Card style={{ backgroundColor: color }}>
        <TopBox>
          <div className="noteCard_title">
            {title.length > 10 ? title.slice(0, 10) + "..." : title}
          </div>
          <div className="noteCard__top-options">
            <span className="noteCard__priority">{priority}</span>

            {/* 아카이브 또는 휴지통에 있지 않은 경우 핀 기능 표시 */}
            {type !== "archive" && type !== "trash" && (
              <NotesIconBox
                className="noteCard__pin"
                onClick={() => dispatch(setPinnedNotes({ id }))} 
              >
                <BsFillPinFill style={{ color: isPinned ? "red" : "" }} />
              </NotesIconBox>
            )}
          </div>
        </TopBox>
        <ContentBox onClick={() => dispatch(readNote({ type, id }))}>
          {parse(func())}
        </ContentBox>
        <TagsBox>
          {tags?.map(({ tag, id }) => (
            <span key={id}>{tag}</span>
          ))}
        </TagsBox>

        <FooterBox>
          <div className="noteCard__date">{date}</div>
        </FooterBox>
      </Card>
    </>
  );
};

export default NoteCard;
