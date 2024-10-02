import { createSlice } from "@reduxjs/toolkit";
import { v4 } from 'uuid';
import { Tag } from "../../types/tag";

import { toast } from "react-toastify";

interface TagState {
tagsList: Tag[];
}

const initialState: TagState = {
tagsList: [
{ tag: "coding", id: v4() },
{ tag: "exercise", id: v4() },
{ tag: "relationship", id: v4() },
],
};

const tagsSlice = createSlice({
  name: "tags",
  initialState,
  reducers: {
    addTags: (state, { payload }) => {
      if (state.tagsList.find(({ tag }) => tag === payload.tag)) {
        alert("이미 존재하는 태그 입니다.");
      } else {
        state.tagsList.push(payload);
      }
    },
    deleteTags: (state, { payload }) => {
      state.tagsList = state.tagsList.filter(({ id }) => id !== payload);
      toast.info("태그가 삭제되었습니다.");
    },
  },
});

export const { addTags, deleteTags } = tagsSlice.actions;
export default tagsSlice.reducer;