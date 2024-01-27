import { configureStore, createSlice } from "@reduxjs/toolkit";

export const utilSlice = createSlice({
  name: "utils",
  initialState: {
    hideFriendList: true,
    showDisconnect: false,
  },
  reducers: {
    setHideFriendList: (state) => {
      state.hideFriendList = !state.hideFriendList;
    },
    setShowDisconnect: (state, { payload }) => {
      state.showDisconnect = payload;
    },
  },
});

export const { setHideFriendList, setShowDisconnect } = utilSlice.actions;

export const utilStore = configureStore({
  reducer: utilSlice.reducer,
});
