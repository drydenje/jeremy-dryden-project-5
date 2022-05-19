// Contains all actions used to manage the list of articles

// ADD_ARTICLES
// export const addArticles = (keyword = "") => ({
//   type: "ADD_ARTICLES",
//   keyword
// });
export const ADD_ARTICLES = "ADD_ARTICLES";

export function addArticles(myquery) {
  return async function(dispatch) {
    console.log("addArt fired");
    const query = "Cody Bellinger";
    const maxArticles = 3;

    const res = await fetch(
      `https://gnews.io/api/v3/search?q=${query}&token=${process.env.REACT_APP_GKEY}&max=${maxArticles}&in=title`
    );
    const articles = await res.json();
    return dispatch({
      type: "ADD_ARTICLES",
      data: "test"
    });

    // .then(function(response) {
    //   return response.json();
    // })
    // .then(function(data) {
    //   console.log("DATA:", data);
    // });
  };
}

export const clearArticles = () => ({
  type: "CLEAR_ARTICLES"
});
