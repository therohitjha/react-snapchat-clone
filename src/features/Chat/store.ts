import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuid } from 'uuid';
import { api, loadable } from 'utils';
import { Loadable } from 'types';
import { Message } from './types';

const initialState: {
  thread: string;
  messages: Loadable<Message[]>;
} = {
  thread: 'Lisa',
  messages: loadable
};

export const getMessages = createAsyncThunk(
  'chat/messagesReceived',
  async (user: string) => {
    const [error, response] = await api.get(`/messages.json?thread=${user}`);
    if (error) return false;
    return response.messages;
  }
);

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    postMessage: {
      reducer(
        state,
        action: PayloadAction<{
          id: string;
          author: string;
          message: string;
          time: Date;
        }>
      ) {
        const { id, author, message, time } = action.payload;
        state.messages.data.push({
          id,
          author,
          message,
          time
        });
      },
      prepare(author: string, message: string) {
        return {
          payload: {
            id: uuid(),
            author,
            message,
            time: new Date()
          }
        };
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getMessages.pending, ({ messages }) => {
      messages.loading = true;
    });
    builder.addCase(getMessages.fulfilled, ({ messages }, { payload }) => {
      messages.loading = false;
      if (payload) messages.data = payload;
      else messages.error = true;
    });
    builder.addCase(getMessages.rejected, ({ messages }) => {
      messages.loading = false;
      messages.error = true;
    });
  }
});

export const { postMessage } = chatSlice.actions;

export default chatSlice.reducer;
