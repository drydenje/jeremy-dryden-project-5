import { configureStore, createListenerMiddleware } from "@reduxjs/toolkit";
import feedReducer, { addArticles, selectAllKeywords } from "state/feedSlice";

const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  actionCreator: addArticles,
  // matcher: feedReducer.addArticles,
  effect: async (action, listenerApi) => {
    // const keywords = selectAllKeywords(listenerApi.getState());
    // console.log("KW:", keywords);
    // const s = listenerApi.getState();
    // console.log("state:", s.articles.keywords);
    // console.log("A:", action);
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
