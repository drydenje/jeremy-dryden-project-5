import articlesReducer from "./articles";
import testArticles from "../fixtures/articles";

test("should setup default empty article array", () => {
  const state = articlesReducer(undefined, { type: "@@INIT" });
  expect(state).toEqual([]);
});

test("should add an object containing articles to an empty state", () => {
  const action = {
    type: "ADD_ARTICLES",
    keyword: "Cody Bellinger",
    articles: testArticles.articles
  };
  const state = articlesReducer(undefined, action);
  // console.log(state);
  const result = {
    [action.keyword]: [...testArticles.articles]
  };

  expect(state).toEqual(result);
});
