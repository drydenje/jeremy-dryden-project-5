import { toURL } from "../url";

it("should take an array of query keywords and return a url", () => {
  const keywords = ["Microsoft", "Apple", "Mike Trout"];
  const url = toURL(keywords);
  expect(url).toEqual("Microsoft%2CApple%2CMike%20Trout");
});
