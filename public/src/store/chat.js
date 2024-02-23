import { createSlice } from "@reduxjs/toolkit";

const inittalState = {
  chats: [],
  newChat: false,
  isLoader: false,
  recentChat: [],
  previousChat: [],
};

const chatSlice = createSlice({
  name: "chat",
  initialState: inittalState,
  reducers: {
    loaderHandler(state) {
      state.isLoader = !state.isLoader;
    },
    newChatHandler(state) {
      state.chats.length > 0 ? (state.newChat = true) : (state.newChat = false);
    },
    replaceChat(state, action) {
      state.chats = action.payload.chats;
    },
    replaceRecentChat(state, action) {
      state.recentChat = action.payload.recentChat;
    },
    chatStart(state, action) {
      state.chats.push({
        user: action.payload.useInput.user,
        isLoader: action.payload.useInput.isLoader,
        gemini: action.payload.useInput.gemini,
        id: Math.random(),
      });
    },
    popChat(state) {
      state.chats.pop();
    },
    previousChatHandler(state, action) {
      state.previousChat.push(
        action.payload.previousChat[0],
        action.payload.previousChat[1]
      );
    },
  },
});

export const chatAction = chatSlice.actions;

export default chatSlice.reducer;
