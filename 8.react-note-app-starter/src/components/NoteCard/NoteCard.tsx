import { NotesIconBox } from '../../styles/styles';
import { Card, ContentBox, FooterBox, TagsBox, TopBox } from './NoteCard.styles';
import { Note } from '../../types/note';
import { BsFillPinFill } from 'react-icons/bs';

interface NoteCardProps {
  note: Note;
  type: string;
}

const NoteCard: FC<NoteCardProps> = ({ note, type }) => {
  const { title, content, tags, color, priority, date, isPinned } = note;

  return (
    <Card style={{ backgroundColor: color }}>
      <TopBox>
        <div className="noteCard_title">
          {title.length > 10 ? title.slice(0, 10) + "..." : title}
        </div>
        <div className="noteCard_top-options">
          <span className="noteCard_priority">{priority}</span>

          {type !== "archive" && type !== "trash" && (
            <NotesIconBox className="noteCard_pin">
              <BsFillPinFill style={{ color: isPinned ? "red" : "" }} />
            </NotesIconBox>
          )}
        </div>
      </TopBox>

      <ContentBox>
        {content}
      </ContentBox>

      <TagsBox>
        {tags?.map(({ tag, id }) => (
          <span key={id}>{tag}</span>
        ))}
      </TagsBox>

      <FooterBox>
        <div className="noteCard_date">{date}</div>
      </FooterBox>
    </Card>
  );
};

export default NoteCard;
