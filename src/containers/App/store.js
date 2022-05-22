import { configureStore } from "@reduxjs/toolkit";
import feedReducer from "../Feed/feedSlice";

export default configureStore({
  reducer: {
    articles: feedReducer,
  },
});
