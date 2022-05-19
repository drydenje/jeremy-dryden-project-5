const articlesReducerDefaultState = [];

export default (state = articlesReducerDefaultState, action) => {
  switch (action.type) {
    case "ADD_ARTICLES":
      return {
        ...state,
        [action.keyword]: action.articles
      };
    case "CLEAR_ARTICLES":
      return {
        articles: []
      };
    case "REMOVE_ARTICLE":
      return state.filter(article => article.url !== action.url);
    default:
      return state;
  }
};
