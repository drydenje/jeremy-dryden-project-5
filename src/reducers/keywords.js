const keywordsReducerDefaultState = [];

export default (state = keywordsReducerDefaultState, action) => {
  switch (action.type) {
    case "ADD_KEYWORD":
      return {
        keywords: [...state.keywords, action.text]
      };
    case "REMOVE_KEYWORD":
      return {
        keywords: [...state.keywords.filter(keyword => keyword !== action.text)]
      };
    case "CLEAR_KEYWORDS":
      return [];
    default:
      return state;
  }
};
