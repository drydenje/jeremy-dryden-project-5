import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  keywords: {},
  status: "idle", // states can be idle, loading, succeeded, failed
  error: null,
};

export const feedSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {
    addArticles: (state, action) => {
      const existingEntities = state.keywords;

      // the starting state
      const startingState = JSON.parse(JSON.stringify(existingEntities));

      // the new keywords object, to be combined with the current state and returned
      let newKeywords = {};

      // all current keywords and articles
      let result = state;

      // for each url param passed with the payload
      action.payload.keywordArray.forEach((word) => {
        newKeywords[word] = startingState[word] || [];
      });
      result = {
        ...state,
        keywords: { ...newKeywords },
      };
      return result;
    },
    addSearchResults: (state, action) => {
      return {
        ...state,
      };
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
        state.keywords[query] = data;
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const fetchArticles = createAsyncThunk(
  "articles/fetchArticles",
  async (query) => {
    const response = await fetch(
      `${process.env.REACT_APP_FETCH_URL}search?q=${query}&lang=en&max=${process.env.REACT_APP_MAX_ARTICLES}&token=${process.env.REACT_APP_GKEY}`
    ).then((response) => response.json());

    return {
      query: query,
      data: response.articles,
    };
  }
);

export const selectAllArticles = (state) => state.articles.keywords;

export const selectMissingArticles = (state) => {
  const { keywords } = state.articles;
  const keys = Object.keys(state.articles.keywords);
  return keys.filter((word) => keywords[word].length === 0);
};

export const selectArticlesByKeyword = (state, keyword) =>
  state.keywords[keyword];

export const selectAllKeywords = (state) =>
  Object.keys(state.articles.keywords);

export const { addArticles, addSearchResults } = feedSlice.actions;

export default feedSlice.reducer;
