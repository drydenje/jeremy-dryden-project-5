import { combineReducers } from "redux";

import articles from "./reducers/articles";
import keywords from "./reducers/keywords";

const rootReducer = combineReducers({
  articles,
  keywords
});

export default rootReducer;
