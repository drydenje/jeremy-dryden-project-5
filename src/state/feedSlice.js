import { createSlice } from "@reduxjs/toolkit";
import articles from "fixtures/articles";

const arrNew = articles;
const initialState = {
  "Cody Bellinger": articles,
  Microsoft: articles,
  Apple: articles,
};

export const feedSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {
    addArticles: (state, action) => {
      // console.log("keyword:", action.payload.keyword);
      // state.push(action.payload);
      return {
        ...state,
        [action.payload.keyword]: arrNew,
      };
    },
    clearArticles: (state, action) => {
      // clear all of the articles
      state.articles = {};
    },
    removeKeyword: (state, action) => {
      // remove a specific keyword and the articles related to it
      console.log("remove keyword:", action.payload.keyword);
    },
  },
});

export const { addArticles, clearArticles, removeKeyword } = feedSlice.actions;

export default feedSlice.reducer;
