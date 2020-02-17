import keywordsReducer from "./keywords";

test("should setup default keyword array", () => {
  const state = keywordsReducer(undefined, { type: "@@INIT" });
  expect(state).toEqual([]);
});

test("should add a keyword to an empty state", () => {
  const searchTerm = "Mess with the honk";
  const currentState = { keywords: [] };
  const action = { type: "ADD_KEYWORD", text: searchTerm };
  const state = keywordsReducer(currentState, action);
  expect(state).toEqual({
    keywords: [`${searchTerm}`]
  });
});

test("should append a keyword to the state without removing the other enteries", () => {
  const searchTerm = "You get the bonk";
  const currentState = { keywords: ["Sony", "Apple"] };
  const action = { type: "ADD_KEYWORD", text: searchTerm };
  const state = keywordsReducer(currentState, action);
  expect(state).toEqual({
    keywords: [...currentState.keywords, searchTerm]
  });
});

test("should remove a keyword from the state", () => {
  const searchTerm = "Dodo";
  const currentState = {
    keywords: ["Sparrow", "Swan", "Loon", "Dodo", "Other Dodo"]
  };
  const action = { type: "REMOVE_KEYWORD", text: searchTerm };
  const state = keywordsReducer(currentState, action);
  expect(state).toEqual({
    keywords: currentState.keywords.filter(item => item !== searchTerm)
  });
});

test("should clear the state of any stored keywords", () => {
  const currentState = { keywords: ["one", "two", "three"] };
  const action = { type: "CLEAR_KEYWORDS" };
  const state = keywordsReducer(currentState, action);
  expect(state).toEqual([]);
});
