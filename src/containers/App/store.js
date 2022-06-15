import { configureStore } from "@reduxjs/toolkit";
import feedReducer from "../../state/feedSlice";

export default configureStore({
  reducer: {
    articles: feedReducer,
  },
});
