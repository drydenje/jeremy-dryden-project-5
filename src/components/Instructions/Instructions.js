import React from "react";

const Instructions = () => {
  return (
    <>
      <h1>Instructions</h1>
      <p>Add a query in the search box</p>
      <p>The Url will update, and can be shared or bookmarked</p>
      <p>Click each term below the search bar to focus the feed on that term</p>
      <p>Click the 'x' to delete the term</p>
      <p>
        There is a maximum of 3 terms you can search for, with three results
        each. This is because of restrictions for the free tier of the api
      </p>
    </>
  );
};

export default Instructions;
