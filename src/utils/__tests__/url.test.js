import { toURL, toArray } from "../url";

it("should take an array of query keywords and return a url", () => {
  const keywords = ["Microsoft", "Apple", "Mike Trout"];
  const url = toURL(keywords);
  expect(url).toEqual("Microsoft%2CApple%2CMike%20Trout");
});

it("should take a query string, parse it, and return an array of keywords", () => {
  const urlString = "one%2Ctwo%2Cthree";
  const keywords = toArray(urlString);
  expect(keywords).toEqual(["one", "two", "three"]);
});

it("should encode an array then decode it and have matching results", () => {
  const keywords = ["Microsoft", "Apple", "Mike Trout"];
  const url = toURL(keywords);
  const arr = toArray(url);
  expect(arr).toEqual(keywords);
});

// should remove all commas from the keyword array before it's encoded
it("should encode and decode an array with one keyword containing a comma", () => {
  const keywords = ["Microsoft", "Apple", "Mike, Trout"];
  const expected = ["Microsoft", "Apple", "Mike Trout"];

  const url = toURL(keywords);
  const arr = toArray(url);
  expect(arr).toEqual(expected);
});
