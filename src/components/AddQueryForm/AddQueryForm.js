import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { nanoid } from "@reduxjs/toolkit";
import { addKeyword } from "../Navigation/navigationSlice";
import "./AddQueryForm.css";

// const query = ["Microsoft", "Apple", "IBM"];
const query = { keyword: "Microsoft" };

const AddQueryForm = () => {
  const [keyword, setKeyword] = useState("");
  const onKeywordChanged = (e) => setKeyword(e.target.value);
  const dispatch = useDispatch();
  let [searchParams, setSearchParams] = useSearchParams();

  const onAddQueryClicked = (event) => {
    event.preventDefault();
    if (keyword) {
      // dispatch(
      //   addKeyword({
      //     id: nanoid(),
      //     keyword,
      //   })
      // );
      // setSearchParams(encodeURIComponent({ query }));
      setSearchParams(query);
      console.log("Search:", searchParams);
      setKeyword("");
    }
  };

  return (
    <form>
      <label htmlFor="addQuery">Add Keyword:</label>
      <input
        type="text"
        placeholder="Add a query to watch for"
        id="addQuery"
        name="addQuery"
        value={keyword}
        onChange={onKeywordChanged}
      />
      <button type="button" onClick={onAddQueryClicked}>
        Add Query
      </button>
    </form>
  );
};

export default AddQueryForm;
