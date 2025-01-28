import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isChatbotOpen: false,
  selectedContentDelta: null,
  chatMessages: [],
  editorState: 'EDITING',
  firstContentDelta: null,
  lastContentDelta: null,
};

const ResumeEditorAndChatCrontrol = createSlice({
  name: 'ResumeEditorAndChatCrontrol',
  initialState,
  reducers: {
    setIsChatbotOpen: (state, action) => {
      state.isChatbotOpen = action.payload;
    },
    setSelectedContentDelta: (state, action) => {
      state.selectedContentDelta = action.payload;
    },
    addChatMessage: (state, action) => {
      state.chatMessages = [...state.chatMessages, action.payload];
    },
    setEditorState: (state, action) => {
      state.editorState = action.payload;
    },
    setFirstContentDelta: (state, action) => {
      state.firstContentDelta = action.payload;
    },
    setLastContentDelta: (state, action) => {
      state.lastContentDelta = action.payload;
    },
  },
});

export const {
  setIsChatbotOpen,
  setSelectedContentDelta,
  addChatMessage,
  setEditorState,
  setFirstContentDelta,
  setLastContentDelta,
} = ResumeEditorAndChatCrontrol.actions;
export default ResumeEditorAndChatCrontrol.reducer;
