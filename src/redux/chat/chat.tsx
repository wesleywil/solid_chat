import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../utils/interfaces";

export interface chatState {
  user: User;
}

const initialState: chatState = {
  user: {} as User,
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    resetUser: (state, action: PayloadAction<number>) => {
      if (state.user.id === action.payload) {
        state.user = {} as User;
      }
    },
  },
});

export const { setUser, resetUser } = chatSlice.actions;

export const chatStore = configureStore({
  reducer: chatSlice.reducer,
});
