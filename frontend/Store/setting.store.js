import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "settings",
  initialState: {
    timer: 60,
    wordList: "simple",
    showWPM: true,
    showTimer: true,
  },
  reducers: {
    setTimer(state, action) {
      state.duration = action.payload;
    },
    setWordList(state, action) {
      state.wordList = action.payload;
    },
    showWPM(state, action) {
      state.showWPM = action.payload;
    },
    showTimer(state, action) {
      state.showTimer = action.payload;
    },
  },
});

export const { setTimer, setWordList, showTimer, showWPM } = slice.actions;
export default slice.reducer;
