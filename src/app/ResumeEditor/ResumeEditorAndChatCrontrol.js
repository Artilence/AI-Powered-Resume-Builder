import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isChatbotOpen: false,
  selectedContent: null,
  chatMessages: [],
  editorState: 'EDITING',
};

const ResumeEditorAndChatCrontrol = createSlice({
  name: 'ResumeEditorAndChatCrontrol',
  initialState,
  reducers: {
    setIsChatbotOpen: (state, action) => {
      state.isChatbotOpen = action.payload;
    },
    setSelectedContent: (state, action) => {
      state.selectedContent = action.payload;
    },
    addChatMessage: (state, action) => {
      state.chatMessages = [...state.chatMessages, action.payload];
    },
    setEditorState: (state, action) => {
      state.editorState = action.payload;
    },
  },
});

export const {
  setIsChatbotOpen,
  setSelectedContent,
  addChatMessage,
  setEditorState,
} = ResumeEditorAndChatCrontrol.actions;
export default ResumeEditorAndChatCrontrol.reducer;
