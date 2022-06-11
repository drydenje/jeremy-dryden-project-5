// Take an array of query keywords and return a url
export const toURL = (keywords) => {
  const result = encodeURIComponent(keywords);
  return result;
};

// Take a query string, parse it, and return an array of keywords
export const toArray = (queryString) => {
  const result = decodeURIComponent(queryString);
  return result;
};
