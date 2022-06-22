import { configureStore, createListenerMiddleware } from "@reduxjs/toolkit";
import feedReducer, { addArticles, selectAllKeywords } from "state/feedSlice";

const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  actionCreator: addArticles,
  // matcher: feedReducer.addArticles,
  effect: async (action, listenerApi) => {
    const keywords = selectAllKeywords(listenerApi.getState());

    console.log("KW:", keywords);
    console.log("A:", action);
    listenerApi.cancelActiveListeners();
  },
});

export default configureStore({
  reducer: {
    articles: feedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(listenerMiddleware.middleware),
});
