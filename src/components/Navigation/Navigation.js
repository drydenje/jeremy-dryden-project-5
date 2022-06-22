import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { selectAllKeywords } from "state/feedSlice";
import "./Navigation.css";

const Navigation = () => {
  const keywords = useSelector(selectAllKeywords);
  // console.log("KW:", keywords);
  let [searchParams, setSearchParams] = useSearchParams();

  // remove the query keyword from the url param array
  const removeKeyword = (keyword) => {
    const words = searchParams.getAll("q").filter((word) => {
      return word !== keyword;
    });
    setSearchParams({ q: words });
  };

  const renderedKeywords = keywords.map((item) => {
    return (
      <li key={item}>
        {item}
        <span>
          <a
            href="#0"
            onClick={(e) => {
              e.preventDefault();
              removeKeyword(item);
            }}
          >
            <i className="far fa-times-circle fa-sm" />
          </a>
        </span>
      </li>
    );
  });

  return (
    <>
      {/* <input type="checkbox" id="navMenu" /> */}
      <nav>
        {/* <label htmlFor="navMenu">
          Close
          <i className="far fa-times-circle fa-1x" />
        </label> */}
        <ul>{renderedKeywords}</ul>
      </nav>
    </>
  );
};

export default Navigation;
