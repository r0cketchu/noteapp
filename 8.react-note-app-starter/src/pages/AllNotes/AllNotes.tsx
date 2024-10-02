import React, { useState } from 'react';
import { ButtonOutline, Container, EmptyMsgBox} from '../../styles/styles';
import { useAppSelector, useAppDispatch } from '../../hooks/redux';
import { toggleFiltersModal } from '../../store/modal/modalSlice';
import { InputBox, TopBox } from './AllNotes.styles';

const AllNotes = () => {
  const { mainNotes } = useAppSelector((state) => state.notesList);
  const [searchInput, setSearchInput] = useState('');
  const [filter, setFilter] = useState('');
  const dispatch = useAppDispatch();

  return (
    <Container>
      {mainNotes.length === 0 ? (
        <EmptyMsgBox>노트가 없습니다.</EmptyMsgBox>
      ) : (
        <>
          <TopBox>
            <InputBox>
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="노트의 제목을 입력해주세요."
              />
            </InputBox>

            <div className="note__filter-btn">
              <ButtonOutline
                onClick={() => dispatch(toggleFiltersModal(true))}
                className="nav__btn"
              >
                <span>정렬</span>
              </ButtonOutline>
            </div>
          </TopBox>

          <Box>
            {}
            {getAllNotes(mainNotes, filter)}
          </Box>
        </>
      )}
    </Container>
  );
};

export default AllNotes;
