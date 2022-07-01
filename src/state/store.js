import { configureStore, createListenerMiddleware } from "@reduxjs/toolkit";
// import feedReducer, { addArticles, checkArticles } from "state/feedSlice";
import feedReducer, {
  addArticles,
  // selectAllArticles,
  selectMissingArticles,
} from "state/feedSlice";
// import feedReducer, { addArticles } from "state/feedSlice";

const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  actionCreator: addArticles,
  effect: async (action, listenerApi) => {
    // const keywords = selectAllKeywords(listenerApi.getState());
    // const articles = selectAllArticles(listenerApi.getState());
    const keywords = selectMissingArticles(listenerApi.getState());
    console.log("KW:", keywords);

    // selectMissingArticles() <- make this in feedslice
    // dispatch addSearchResults <- adds the state to the keyword in feedslice

    // OR!!!
    // use code below to inspect payload and fetch as the action is sent
    // this might be better i think ?
    // No, the payload is just the keywords being sent to the reducer
    // const s = listenerApi.getState();
    // console.log("state:", s.articles);
    // console.log("A:", action);
    // checkArticles();
    // listenerApi.cancelActiveListeners();
  },
});

export default configureStore({
  reducer: {
    articles: feedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(listenerMiddleware.middleware),
});
