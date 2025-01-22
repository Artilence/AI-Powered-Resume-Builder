// CurrentChatbotContextSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  content: '',
  editorState: '',
  firstContent: '',
  lastContent: '',
  newContent: '',
  selectedContent: '',
};

const currentChatbotContextSlice = createSlice({
  name: 'currentChatbotContext',
  initialState,
  reducers: {
    setContent: (state, action) => {
      state.content = action.payload;
    },
    setEditorState: (state, action) => {
      state.editorState = action.payload;
    },
    setFirstContent: (state, action) => {
      state.firstContent = action.payload;
    },
    setLastContent: (state, action) => {
      state.lastContent = action.payload;
    },
    setNewContent: (state, action) => {
      state.newContent = action.payload;
    },

    setSelectedContent: (state, action) => {
      state.selectedContent = action.payload;
    },
  },
});

export const {
  setContent,
  setEditorState,
  setFirstContent,
  setLastContent,
  setNewContent,
  setSelectedContent,
} = currentChatbotContextSlice.actions;

export default currentChatbotContextSlice.reducer;
