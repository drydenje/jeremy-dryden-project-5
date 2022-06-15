import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import "./AddQueryForm.css";

const AddQueryForm = () => {
  const [keyword, setKeyword] = useState("");
  const onKeywordChanged = (e) => setKeyword(e.target.value);
  let [searchParams, setSearchParams] = useSearchParams();
  let navigate = useNavigate();

  const handleSubmit = async (event) => {
    // prevent the form from refreshing the page
    event.preventDefault();
    // await submitForm(event.target);
    navigate("../search", { replace: true });

    // create a new array from the parameters in the url
    let newParams = searchParams.getAll("q");
    // add the latest keyword
    newParams.push(keyword);
    // set the new url
    setSearchParams({ q: newParams });

    // clear the state and text input
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
