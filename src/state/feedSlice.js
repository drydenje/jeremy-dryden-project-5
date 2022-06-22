import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import articles from "fixtures/articles";

const arrNew = articles;
const initialState = {
  keywords: {
    "Cody Bellinger": arrNew,
  },
  status: "idle", // idle, loading, succeeded, failed
  error: null,
};

export const feedSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {
    addArticles: (state, action) => {
      // let result = {};
      // action.payload.keywordArray.forEach((word) => {
      //   result[word] = {
      //     articles: arrNew,
      //     status: "idle",
      //     error: null,
      //   };
      // });
      // let result = {};
      // action.payload.keywordArray.forEach((word) => {
      //   result[word] = {
      //     articles: arrNew,
      //     status: "idle",
      //     error: null,
      //   };
      // });
      // return result;
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
export const fetchArticles = createAsyncThunk(
  "articles/fetchPosts",
  async () => {
    const response = await fetch(
      "https://pokeapi.co/api/v2/ability/battle-armor"
    ).then((response) => response.json());
    console.log(response.pokemon);
    return response;
  }
);

export const selectAllArticles = (state) => state.articles.keywords;

export const selectArticlesByKeyword = (state, keyword) =>
  state.keywords[keyword];

export const selectAllKeywords = (state) =>
  Object.keys(state.articles.keywords);

export const { addArticles, clearArticles, removeKeyword } = feedSlice.actions;

export default feedSlice.reducer;
