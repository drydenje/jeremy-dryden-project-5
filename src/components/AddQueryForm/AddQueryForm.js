import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
import { addKeyword } from "../Navigation/navigationSlice";
import "./AddQueryForm.css";

const AddQueryForm = () => {
  const [keyword, setKeyword] = useState("");
  const onKeywordChanged = (e) => setKeyword(e.target.value);
  const dispatch = useDispatch();

  const onAddQueryClicked = () => {
    if (keyword) {
      dispatch(
        addKeyword({
          id: nanoid(),
          keyword,
        })
      );
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
