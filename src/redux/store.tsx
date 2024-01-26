import { onCleanup } from "solid-js";
import { configureStore, createSlice } from "@reduxjs/toolkit";
import { createStore, reconcile } from "solid-js/store";

// Create a slice using createSlice
const utilSlice = createSlice({
  name: "todos",
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

// Configure the store using configureStore
const store = configureStore({
  reducer: utilSlice.reducer,
});

// Extract actions from the slice
export const { setHideFriendList, setShowDisconnect } = utilSlice.actions;

export default function useRedux() {
  const [state, setState] = createStore(store.getState());
  const unsubscribe = store.subscribe(() =>
    setState(reconcile(store.getState()))
  );

  onCleanup(() => unsubscribe());
  return [state, mapActions(store)];
}

function mapActions(store: any) {
  // You don't need the separate 'actions' parameter anymore
  const mapped: any = {};
  const actions: any = utilSlice.actions;

  for (const key in actions) {
    mapped[key] = (...args: any) => store.dispatch(actions[key](...args));
  }

  return mapped;
}
