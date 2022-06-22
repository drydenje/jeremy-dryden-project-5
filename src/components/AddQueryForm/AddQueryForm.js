import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
import { addArticles, fetchArticles } from "state/feedSlice";
import "./AddQueryForm.css";

const AddQueryForm = () => {
  const [keyword, setKeyword] = useState("");
  const onKeywordChanged = (e) => setKeyword(e.target.value);
  let [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();

  const postStatus = useSelector((state) => state.articles.status);
  // console.log("PS:", postStatus);
  // useEffect(() => {
  //   if (postStatus === "idle") {
  //     dispatch(fetchArticles());
  //   }
  // }, [postStatus, dispatch]);

  const handleSubmit = async (event) => {
    // prevent the form from refreshing the page
    event.preventDefault();

    // create a new array from the parameters in the url
    let newParams = searchParams.getAll("q");
    // add the latest keyword
    newParams.push(keyword);
    // set the new url
    setSearchParams({ q: newParams });

    // clear the state and text input
    setKeyword("");
  };

  // need to dispatch every time the url is updated
  useEffect(() => {
    dispatch(
      addArticles({
        id: nanoid(),
        // keyword: currentParams["q"],
        keywordArray: searchParams.getAll("q"),
      })
    );
  }, [searchParams, dispatch]);

  return (
    <form onSubmit={handleSubmit}>
      {/* <label htmlFor="addQuery">Add Keyword:</label> */}
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
