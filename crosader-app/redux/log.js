import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentMintState: null,
  currentSortStatus: "oldest",
};

const logSlice = createSlice({
  name: "log",
  initialState,
  reducers: {
    updateCurrentMintState(state, action) {
      state.currentMintState = action.payload;
    },
    updateCurrentSortState(state, action) {
      state.currentSortStatus = action.payload;
    },
  },
});

export const { updateCurrentMintState, updateCurrentSortState } =
  logSlice.actions;
export default logSlice.reducer;
