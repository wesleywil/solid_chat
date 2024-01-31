import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../utils/interfaces";

export interface usersState {
  allOnlineUsers: User[];
  onlineUsers: User[];
}

const initialState: usersState = {
  allOnlineUsers: [],
  onlineUsers: [],
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setOnlineUsers: (state, action: PayloadAction<User[]>) => {
      state.allOnlineUsers = action.payload;
      state.onlineUsers = action.payload;
    },
    filterOnlineUsers: (state, action: PayloadAction<string>) => {
      const filteredUsers = state.allOnlineUsers.filter((item: User) =>
        item.username.toLowerCase().includes(action.payload)
      );
      state.onlineUsers = filteredUsers;
    },
  },
});

export const { setOnlineUsers, filterOnlineUsers } = usersSlice.actions;

export const userStore = configureStore({
  reducer: usersSlice.reducer,
});
