import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  "-LuzhCoSR-r6jUhrwTN9": "airpods",
};

export const navigationSlice = createSlice({
  name: "keywords",
  initialState,
  reducers: {
    addKeyword: (state, action) => {
      // add a new keyword
      state.push(action.payload);
    },
    removeKeyword: (state, action) => {
      // remove a keyword
    },
    clearKeywords: (state, action) => {
      // clear all the keywords
    },
  },
});

export const { addKeyword, removeKeyword, clearKeywords } =
  navigationSlice.actions;

export default navigationSlice.reducer;
