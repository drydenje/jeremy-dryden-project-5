import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { nanoid } from "@reduxjs/toolkit";
import { addKeyword } from "../Navigation/navigationSlice";
import "./AddQueryForm.css";

// const query = ["Microsoft", "Apple", "IBM"];
// const query = { keyword: "Microsoft" };

const AddQueryForm = () => {
  const [keyword, setKeyword] = useState("");
  const onKeywordChanged = (e) => setKeyword(e.target.value);
  const dispatch = useDispatch();
  // let [searchParams, setSearchParams] = useSearchParams();
  let [searchParams] = useSearchParams();

  useEffect(() => {
    const currentParams = Object.fromEntries([...searchParams]);
    // console.log(currentParams["query"]);

    // check if a query has been provided
    // might have this check moved to the reducer?
    if (currentParams["query"]) {
      dispatch(
        addKeyword({
          id: nanoid(),
          keyword: currentParams["query"],
        })
      );
    }
  }, [searchParams]);

  const handleSubmit = (event) => {
    console.log(event.target);
    event.preventDefault();
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
    <form>
      <label htmlFor="addQuery">Add Keyword:</label>
      <input
        onSubmit={handleSubmit}
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
