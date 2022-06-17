import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import "./Navigation.css";

const Navigation = () => {
  const keywords = useSelector((state) => Object.keys(state.articles));
  let [searchParams, setSearchParams] = useSearchParams();

  // remove the query keyword from the url param array
  const removeKeyword = (keyword) => {
    const words = searchParams.getAll("q").filter((word) => {
      return word !== keyword;
    });
    setSearchParams({ q: words });
  };

  const renderedKeywords = keywords.map((item) => {
    console.log("Item:", item);
    return (
      <li key={item}>
        {item}
        <span>
          <a
            href="#0"
            onClick={(e) => {
              e.preventDefault();
              // console.log(item);
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
