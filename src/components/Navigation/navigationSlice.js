import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  // {
  //   key: "-LuzhCoSR-r6jUhrwTN9",
  //   keyword: "airpods",
  // },
];

export const navigationSlice = createSlice({
  name: "keywords",
  initialState,
  reducers: {
    addKeyword: (state, action) => {
      // const p = action.payload;
      // add a new keyword
      state.push(action.payload);
      // state.push(action.payload);
    },
    removeKeyword: (state, action) => {
      // remove a keyword
    },
    clearKeywords: (state, action) => {
      // clear all the keywords
    },
    buildUrl: (state, action) => {
      console.log(state);
    },
  },
});

export const { addKeyword, removeKeyword, clearKeywords } =
  navigationSlice.actions;

export default navigationSlice.reducer;
