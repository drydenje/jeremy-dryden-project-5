import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import articles from "fixtures/articles";
const arrNew = articles;

const initialState = {
  keywords: {
    Microsoft: arrNew,
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
      // console.log(existingEntities);
      const testState = JSON.parse(JSON.stringify(existingEntities));
      // console.log("S:", testState);
      let newKeywords = {};
      let result = state;
      action.payload.keywordArray.forEach((word) => {
        newKeywords[word] = testState[word] || [];
      });
      result = {
        ...state,
        keywords: { ...newKeywords },
      };
      return result;
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
    console.log("State:");
    const query = "Microsoft";
    const response = await fetch(
      `${process.env.REACT_APP_FETCH_URL}search?q=${query}&max=${process.env.REACT_APP_MAX_ARTICLES}&token=${process.env.REACT_APP_GKEY}`
    ).then((response) => response.json());
    return {
      query: query,
      data: response.articles,
    };
  }
);

export const checkArticles = () => {
  const keywords = {
    one: [],
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
    three: [],
  };

  const keys = Object.keys(keywords);
  const requests = keys
    .filter((word) => keywords[word].length === 0)
    .map((word) => fetchme(word));

  // Handling errors with multiple HTTP requests
  // https://stackoverflow.com/a/67146861
  // Promise.all(requests)
  // .then

  // console.log(requests);

  // fetchme(word);

  return {};
  // foreach keyword
  // if undefined/null?
  // log keyword
  // fetch articles in paralel
};

const fetchme = (word) => {
  console.log(`fetching:${word}`);
};
export const selectAllArticles = (state) => state.articles.keywords;

export const selectArticlesByKeyword = (state, keyword) =>
  state.keywords[keyword];

export const selectAllKeywords = (state) =>
  Object.keys(state.articles.keywords);

export const { addArticles } = feedSlice.actions;

export default feedSlice.reducer;
