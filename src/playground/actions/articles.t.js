import { clearArticles } from "./articles";
// import { addArticles, clearArticles } from "./articles";

// test("should setup ADD_ARTICLES action object with a passed string", () => {
//   const searchTerm = "example";
//   const action = addArticles(searchTerm);
//   expect(action).toEqual({
//     type: "ADD_ARTICLES",
//     keyword: searchTerm
//   });
// });

test("should setup CLEAR_ARTICLES action object", () => {
  const action = clearArticles();
  expect(action).toEqual({
    type: "CLEAR_ARTICLES",
  });
});
