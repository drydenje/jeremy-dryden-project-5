import { useSelector } from "react-redux";
import "./Navigation.css";

const Navigation = () => {
  const keywords = useSelector((state) => Object.keys(state.articles));

  const renderedKeywords = keywords.map((item) => {
    return (
      <li key={item}>
        {item}
        <span>
          <a
            href="#0"
            onClick={(e) => {
              e.preventDefault();
              // props.removeQuery(item.key);
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
