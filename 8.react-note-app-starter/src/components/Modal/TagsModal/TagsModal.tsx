import { FC, useState } from 'react';
import { Tag } from '../../../types/tag';
import { DeleteBox, FixedContainer } from '../Modal.styles';
import { Box, StyledInput, TagsBox } from './TagModal.styles';
import { toggleTagsModal } from '../../../store/modal/modalSlice';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { FaTimes, FaPlus, FaMinus } from 'react-icons/fa';
import getStandardName from '../../../utils/getStandardName';
import { v4 } from 'uuid';
import { addTags, deleteTags } from '../../../store/tags/tagsSlice';
import { removeTags } from '../../../store/notesList/notesListSlice';

interface TagsModalProps {
  type: string;
  addedTags?: Tag[];
  handleTags?: (tag: string, type: string) => void;
}

const TagsModal: FC<TagsModalProps> = ({ type, addedTags, handleTags }) => {
  const dispatch = useAppDispatch();
  const { tagsList } = useAppSelector((state) => state.tags);
  const [inputText, setInputText] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!inputText) {
      return;
    }
    dispatch(addTags({ tag: inputText.toLowerCase(), id: v4() }));
    setInputText("");
  };

  const deleteTagsHandler = (tag: string, id: string) => {
    dispatch(deleteTags(id));
    dispatch(removeTags({ tag }));
  };

  return (
    <FixedContainer>
      <Box>
        <div className="editTags_header">
          <div className="editTags_title">
            {type === "add" ? "태그 추가" : "태그 편집"}
          </div>
          <DeleteBox
            className="editTags_close"
            onClick={() => dispatch(toggleTagsModal({ type, view: false }))}
          >
            <FaTimes />
          </DeleteBox>
        </div>

        <form onSubmit={handleSubmit}>
          <StyledInput
            type="text"
            value={inputText}
            placeholder="새 태그 입력..."
            onChange={(e) => setInputText(e.target.value)}
          />
        </form>
        <TagsBox>
          {tagsList.map(({ tag, id }) => (
            <li key={id}>
              <div className="editTags_tag">{getStandardName(tag)}</div>
              {type === 'edit' ? (
                <DeleteBox onClick={() => deleteTagsHandler(tag, id)}>
                  <FaTimes />
                </DeleteBox>
              ) : (
                <DeleteBox>
                  {addedTags?.find((addedTag: Tag) => addedTag.tag === tag.toLowerCase()) ? (
                    <FaMinus onClick={() => handleTags!(tag, 'remove')} />
                  ) : (
                    <FaPlus onClick={() => handleTags!(tag, 'add')} />
                  )}
                </DeleteBox>
              )}
            </li>
          ))}
        </TagsBox>
      </Box>
    </FixedContainer>
  );
};

export default TagsModal;
