import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import articles from "fixtures/articles";

const initialState = {
  keywords: {
    // Microsoft: articles,
  },
  status: "idle", // idle, loading, succeeded, failed
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
        // newKeywords[word] = startingState[word] || fetchArticles(word);
        newKeywords[word] = startingState[word] || [];
      });
      result = {
        ...state,
        keywords: { ...newKeywords },
      };
      return result;
    },
    addSearchResults: (state, action) => {
      console.log("SearchResults:", action.payload);
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
        console.log("ACTION:", action);
        // console.log("STATE:", state);
        console.log("Q+D:", query, data);
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
  async (query) => {
    // console.log("QUERY:", query);
    // console.log("FETCH ARTICLES ASYNC THUNK");
    // const query = "Apple";
    const response = await fetch(
      `${process.env.REACT_APP_FETCH_URL}search?q=${query}&lang=en&max=${process.env.REACT_APP_MAX_ARTICLES}&token=${process.env.REACT_APP_GKEY}`
    ).then((response) => response.json());
    console.log("RES:", response.articles);
    // const res = await articles;
    // return res;
    // console.log("JSON:", JSON.stringify(articles));
    // return { articles };
    return {
      query: query,
      data: response.articles,
      // data: response.articles,
    };
  }
);

export const checkArticles = () => {
  const keywords = {
    Timex: [],
    two: [
      {
        title:
          "Dodgers' Cody Bellinger: Golf Didn't Contribute to Back Injury After Viral Video",
        description:
          "Though Cody Bellinger has a \"knot\" in his back, the Los Angeles Dodgers star didn't injure himself swinging a golf club, via ESPN. Bellinger was one of several players who took part in Albert Pujols' ...",
        url: "https://bleacherreport.com/articles/2879256-dodgers-cody-bellinger-golf-didnt-contribute-to-back-injury-after-viral-video",
        image: "https://images.gnews.io/df2bf26225995b0e33d19ccd28307191",
        publishedAt: "2020-03-04 14:32:00 UTC",
        source: {
          name: "Bleacher Report",
          url: "https://bleacherreport.com",
        },
      },
      {
        title: "Dodgers' Cody Bellinger: Returning to lineup Thursday",
        description:
          "will return to play in Thursday's Cactus League game against the Athletics, Ken Gurnick of MLB.com reports. Bellinger completed a full workout Wednesday and is set to face off against right-hander ...",
        url: "https://www.cbssports.com/fantasy/baseball/news/dodgers-cody-bellinger-returning-to-lineup-thursday/",
        image: "https://images.gnews.io/a3bd03ce07339fb7a6c98b34da9987c7",
        publishedAt: "2020-03-04 14:05:00 UTC",
        source: {
          name: "CBSSports.com",
          url: "https://www.cbssports.com",
        },
      },
      {
        title:
          "Dodgers' Cody Bellinger insists he didn't hurt his back on golf swing",
        description:
          'Dodgers slugger Cody Bellinger said he did not get a "knot" in his back from swinging at golf balls at Albert Pujols\' annual charity event at Topgolf on Sunday.',
        url: "https://www.espn.com/mlb/story/_/id/28838083/dodgers-cody-bellinger-insists-hurt-back-golf-swing",
        image: "https://images.gnews.io/209e4e891315b8f383ea328fdf3b31d2",
        publishedAt: "2020-03-04 13:50:00 UTC",
        source: {
          name: "ESPN",
          url: "https://www.espn.com",
        },
      },
    ],
    Baseball: [],
  };
  let result = {};

  const keys = Object.keys(keywords).filter(
    (word) => keywords[word].length === 0
  );
  const requests = keys.map((word) => {
    return fetch(
      `${process.env.REACT_APP_FETCH_URL}search?q=${word}&max=${process.env.REACT_APP_MAX_ARTICLES}&token=${process.env.REACT_APP_GKEY}`
    );
  });

  // Handling errors with multiple HTTP requests
  // https://stackoverflow.com/a/67146861
  Promise.all(requests)
    .then((responses) => {
      const errors = responses.filter((response) => !response.ok);
      if (errors.length > 0) {
        throw errors.map((response) => Error(response.statusText));
      }

      const json = responses.map((response) => response.json());
      return Promise.all(json);
    })
    .then((data) => {
      data.forEach((datum, index) => {
        const word = keys[index];
        result[word] = datum.articles;
      });
      console.log(result);
    })
    .catch((errors) => {
      errors.forEach((error) => console.error(error));
    });
};

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
