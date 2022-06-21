import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import articles from "fixtures/articles";

const arrNew = articles;
const initialState = {
  // "Cody Bellinger": articles,
  // Microsoft: articles,
  // Apple: articles,
};

export const feedSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {
    addArticles: (state, action) => {
      // state.push(action.payload);
      // console.log("KWA:", action.payload.keywordArray);
      // console.log("STATE:", state);
      let result = {};
      action.payload.keywordArray.forEach((word) => {
        result[word] = arrNew;
        // console.log("Word:", result[word]);
      });
      // console.log("R:", result);
      return result;
      // return {
      // ...state,
      // [action.payload.keywordArray]: arrNew,
      // };
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

// const checkArticles = () => {
//   return (dispatch, getState) => {
//     const stateBefore = getState();
//     console.log("Before:", stateBefore);
//     dispatch(clearArticles);
//     const stateAfter = getState();
//     console.log("After:", stateAfter);
//   };
// };

// naming will be strange for testing
export const fetchArticles = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await fetch(
    "https://pokeapi.co/api/v2/ability/battle-armor"
  ).then((response) => console.log(response.data));
  return response.data;
});

export const selectAllArticles = (state) => state.articles;

export const selectArticlesByKeyword = (state, keyword) =>
  state.articles[keyword];

export const selectAllKeywords = (state) => Object.keys(state.articles);

export const { addArticles, clearArticles, removeKeyword } = feedSlice.actions;

export default feedSlice.reducer;
