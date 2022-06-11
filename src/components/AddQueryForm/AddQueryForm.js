import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { nanoid } from "@reduxjs/toolkit";
import { addArticles } from "../../containers/Feed/feedSlice";
import { useNavigate } from "react-router-dom";
import "./AddQueryForm.css";

const AddQueryForm = () => {
  let navigate = useNavigate();
  const [keyword, setKeyword] = useState("");
  const dispatch = useDispatch();
  const onKeywordChanged = (e) => setKeyword(e.target.value);
  // let [searchParams, setSearchParams] = useSearchParams();
  let [searchParams] = useSearchParams();

  useEffect(() => {
    const currentParams = Object.fromEntries([...searchParams]);
    console.log("Query:", currentParams["query"]);
    // check if a query has been provided
    // might have this check moved to the reducer?
    if (currentParams["query"]) {
      dispatch(
        addArticles({
          id: nanoid(),
          keyword: currentParams["query"],
        })
      );
    }
  }, [searchParams]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    navigate(`./search/?query=${keyword}`, { replace: true });

    // if (keyword) {
    // dispatch(
    //   addKeyword({
    //     id: nanoid(),
    //     keyword: currentParams["query"],
    //   })
    // );

    // let params = encodeURIComponent(event.target);
    // setSearchParams(params);

    // console.log(event.target);
    // let params = encodeURIComponent(keyword);
    // setSearchParams(params);
    // console.log("Search:", searchParams);
    // setKeyword("");
  };

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
