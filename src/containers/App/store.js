import { configureStore } from "@reduxjs/toolkit";
import feedReducer from "../Feed/feedSlice";
import navigationReducer from "../../components/Navigation/navigationSlice";

export default configureStore({
  reducer: {
    articles: feedReducer,
    keywords: navigationReducer,
  },
});
