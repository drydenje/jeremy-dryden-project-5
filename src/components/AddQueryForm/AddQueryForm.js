import React, { useState, useEffect } from "react";
// import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { nanoid } from "@reduxjs/toolkit";
import { addKeyword } from "../Navigation/navigationSlice";
import "./AddQueryForm.css";

// const query = ["Microsoft", "Apple", "IBM"];
// const query = { keyword: "Microsoft" };

const AddQueryForm = () => {
  const [keyword, setKeyword] = useState("");
  const onKeywordChanged = (e) => setKeyword(e.target.value);
  // const dispatch = useDispatch();
  // let [searchParams, setSearchParams] = useSearchParams();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const currentParams = Object.fromEntries([...searchParams]);
    console.log(currentParams["query"]);
    // dispatchEvent(addKeyword({
    //   id: nanoid(),
    //   keyword:
    // }))
  }, [searchParams]);

  const handleSubmit = (event) => {
    // console.log(event);
    event.preventDefault();
    if (keyword) {
      dispatch(
        addKeyword({
          id: nanoid(),
          keyword: currentParams["query"],
        })
      );
      // setSearchParams(encodeURIComponent({ query }));
      // console.log(event.target);
      // let params = encodeURIComponent(keyword);
      // setSearchParams(params);
      // console.log("Search:", searchParams);
      // setKeyword("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="addQuery">Add Keyword:</label>
      <input
        type="text"
        placeholder="Add a query to watch for"
        id="addQuery"
        name="addQuery"
        value={keyword}
        onChange={onKeywordChanged}
      />
      <button type="button">Add Query</button>
    </form>
  );
};

export default AddQueryForm;
