// Contains all actions that can be performed on the collection of keywords used to search for articles

// ADD_KEYWORD
export const addKeyword = (text = "") => ({
  type: "ADD_KEYWORD",
  text
});

// REMOVE_KEYWORD
export const removeKeyword = text => ({
  type: "REMOVE_KEYWORD",
  text
});

// CLEAR_KEYWORDS
export const clearKeywords = () => ({
  type: "CLEAR_KEYWORDS"
});
