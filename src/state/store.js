import { configureStore, createListenerMiddleware } from "@reduxjs/toolkit";
import feedReducer, {
  addArticles,
  fetchArticles,
  selectMissingArticles,
} from "state/feedSlice";

const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  actionCreator: addArticles,
  effect: async (action, listenerApi) => {
    const keywords = selectMissingArticles(listenerApi.getState());
    keywords.forEach((word) => {
      listenerApi.dispatch(fetchArticles(word));
    });
  },
});

export default configureStore({
  reducer: {
    articles: feedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(listenerMiddleware.middleware),
});
