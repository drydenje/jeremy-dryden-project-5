// Take an array of query keywords and return a url
export const toURL = (keywords) => {
  // look at each word and remove characters that will mess with the results
  // (then remove them)
  const checkedKeywords = keywords.map((word) => word.replace(",", ""));
  const result = encodeURIComponent(checkedKeywords);
  return result;
};

// Take a query string, parse it, and return an array of keywords
export const toArray = (queryString) => {
  const result = decodeURIComponent(queryString).split(",");
  return result;
};
