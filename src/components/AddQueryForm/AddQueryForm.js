import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
import { addArticles } from "state/feedSlice";
import "./AddQueryForm.css";

const AddQueryForm = () => {
  const [keyword, setKeyword] = useState("");
  const onKeywordChanged = (e) => setKeyword(e.target.value);
  let [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    // prevent the form from refreshing the page
    event.preventDefault();

    if (keyword.trim() !== "") {
      // create a new array from the parameters in the url
      let newParams = searchParams.getAll("q");

      // don't let the user add more than 3 terms
      if (newParams.length < 3) {
        // add the latest keyword
        newParams.push(keyword);
        // set the new url
        setSearchParams({ q: newParams });
      }

      // clear the state and text input
      setKeyword("");
    }
  };

  // need to dispatch every time the url is updated
  useEffect(() => {
    dispatch(
      addArticles({
        id: nanoid(),
        keywordArray: searchParams.getAll("q"),
      })
    );
  }, [searchParams, dispatch]);

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Add a query to watch for"
        id="addQuery"
        name="query"
        value={keyword}
        onChange={onKeywordChanged}
      />
      <button type="submit">Add Query</button>
    </form>
  );
};

export default AddQueryForm;
