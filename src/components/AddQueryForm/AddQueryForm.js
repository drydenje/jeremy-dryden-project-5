import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { nanoid } from "@reduxjs/toolkit";
import { addArticles } from "../../containers/Feed/feedSlice";
// import { useNavigate } from "react-router-dom";
import "./AddQueryForm.css";

const AddQueryForm = () => {
  // let navigate = useNavigate();
  const [keyword, setKeyword] = useState("");
  const dispatch = useDispatch();
  const onKeywordChanged = (e) => setKeyword(e.target.value);
  let [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    console.log(searchParams.getAll("q"));
    const currentParams = Object.fromEntries([...searchParams]);
    // console.log("q:", currentParams["q"]);
    // check if a query has been provided
    // might have this check moved to the reducer?
    if (currentParams["q"]) {
      dispatch(
        addArticles({
          id: nanoid(),
          keyword: currentParams["q"],
        })
      );
    }
  }, [searchParams]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    // let newParams = ["Sony", "Microsoft"];
    let newParams = searchParams.getAll("q");
    newParams.push(keyword);

    // console.log("NP:", newParams);
    setSearchParams({ q: newParams });
    // navigate(`./search/?query=${keyword}`, { replace: true });

    setKeyword("");
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
