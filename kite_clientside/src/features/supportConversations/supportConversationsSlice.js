import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getConversationsThunk,
  getReceiverUserThunk,
  getMessagesThunk,
  sendMessageThunk,
  createConversationThunk,
} from './supportConversationsThunk';
import { toast } from 'react-toastify';

const initialState = {
  conversations: [],
  messages: [],
  isNewConversationCreated: false,
};

export const createConversation = createAsyncThunk(
  'supportConversations/createConversation',
  async (data, thunkAPI) => {
    return createConversationThunk(
      `http/api/support/conversation`,
      data,
      thunkAPI
    );
  }
);

export const getConversations = createAsyncThunk(
  'supportConversations/getConversations',
  async (userId, thunkAPI) => {
    return getConversationsThunk(
      `http/api/support/conversation/${userId}`,
      thunkAPI
    );
  }
);

export const getMessages = createAsyncThunk(
  'supportConversations/getMessages',
  async (currentChatId, thunkAPI) => {
    return getMessagesThunk(
      `http/api/support/message/${currentChatId}`,
      thunkAPI
    );
  }
);

export const sendMessage = createAsyncThunk(
  'supportConversations/sendMessage',
  async (data, thunkAPI) => {
    return sendMessageThunk(`http/api/support/message`, data, thunkAPI);
  }
);

const supportConversationsSlice = createSlice({
  name: 'supportConversations',
  initialState,
  reducers: {
    setMessages: (state, { payload }) => {
      state.messages = [...state.messages, payload];
    },
  },
  extraReducers: {
    //get
    [getConversations.fulfilled]: (state, { payload }) => {
      state.conversations = payload.data.conversations;
    },
    //get messages
    [getMessages.fulfilled]: (state, { payload }) => {
      state.messages = payload.data.messages;
    },
    //send messages
    [sendMessage.fulfilled]: (state, { payload }) => {
      state.messages = [...state.messages, payload.data.newMessage];
    },
    //send messages
    [sendMessage.fulfilled]: (state, { payload }) => {
      state.messages = [...state.messages, payload.data.newMessage];
    },
    // create Conversation
    [createConversation.fulfilled]: (state, { payload }) => {
      state.isNewConversationCreated = true;
    },
  },
});

export const { setMessages } = supportConversationsSlice.actions;

export default supportConversationsSlice.reducer;
