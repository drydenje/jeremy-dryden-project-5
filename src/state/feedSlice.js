import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import articles from "fixtures/articles";
// const arrNew = articles;

const initialState = {
  keywords: {
    // "Cody Bellinger": arrNew,
  },
  status: "idle", // idle, loading, succeeded, failed
  error: null,
};

export const feedSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {
    addArticles: (state, action) => {
      let newKeywords = {};
      let result = state;
      action.payload.keywordArray.forEach((word) => {
        newKeywords[word] = [];
      });
      result = {
        ...state,
        keywords: newKeywords,
      };
      return result;
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
  extraReducers(builder) {
    builder
      .addCase(fetchArticles.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        const { query, data } = action.payload;
        state.status = "succeeded";
        // add fetched articles to the object's array
        console.log("ACTION:", action);
        state.keywords[query] = data;
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
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

export const fetchArticles = createAsyncThunk(
  "articles/fetchArticles",
  async () => {
    const query = "Microsoft";
    const response = await fetch(
      `${process.env.REACT_APP_FETCH_URL}search?q=${query}&max=${process.env.REACT_APP_MAX_ARTICLES}&token=${process.env.REACT_APP_GKEY}`
    ).then((response) => response.json());
    console.log(response.articles);
    return {
      query: query,
      data: response.articles,
    };
  }
);

export const selectAllArticles = (state) => state.articles.keywords;

export const selectArticlesByKeyword = (state, keyword) =>
  state.keywords[keyword];

export const selectAllKeywords = (state) =>
  Object.keys(state.articles.keywords);

export const { addArticles, clearArticles, removeKeyword } = feedSlice.actions;

export default feedSlice.reducer;
