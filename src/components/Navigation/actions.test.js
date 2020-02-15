import { addKeyword, removeKeyword, clearKeywords } from "./actions";

test("should setup ADD_KEYWORD action object with a passed string", () => {
  const searchTerm = "Microsoft";
  const action = addKeyword(searchTerm);
  expect(action).toEqual({
    type: "ADD_KEYWORD",
    text: searchTerm
  });
});

test("should setup ADD_KEYWORD action object with default values", () => {
  const action = addKeyword();
  expect(action).toEqual({
    type: "ADD_KEYWORD",
    text: ""
  });
});

test("should setup REMOVE_KEYWORD action object", () => {
  const searchTerm = "Sony";
  const action = removeKeyword(searchTerm);
  expect(action).toEqual({
    type: "REMOVE_KEYWORD",
    text: searchTerm
  });
});

test("should setup CLEAR_KEYWORDS action object", () => {
  const action = clearKeywords();
  expect(action).toEqual({
    type: "CLEAR_KEYWORDS"
  });
});
