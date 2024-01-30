import { configureStore, createSlice } from "@reduxjs/toolkit";

export const utilSlice = createSlice({
  name: "utils",
  initialState: {
    hideFriendList: false,
  },
  reducers: {
    setHideFriendList: (state) => {
      state.hideFriendList = !state.hideFriendList;
    },
  },
});

export const { setHideFriendList } = utilSlice.actions;

export const utilStore = configureStore({
  reducer: utilSlice.reducer,
});
