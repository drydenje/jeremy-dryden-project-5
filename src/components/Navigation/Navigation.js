import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import "./Navigation.css";

const Navigation = () => {
  const keywords = useSelector((state) => state.keywords);
  console.log(keywords);
  return (
    <Fragment>
      <input type="checkbox" id="navMenu" />
      <nav>
        <label htmlFor="navMenu">
          Close
          <i className="far fa-times-circle fa-1x" />
        </label>
        <ul>
          <li key={"all"}>All</li>
          {/* {props.searchTerms.map((item) => {
            return (
              <li key={item.key}>
                {item.keyword}
                <span>
                  <a
                    href="#0"
                    onClick={(e) => {
                      e.preventDefault();
                      props.removeQuery(item.key);
                    }}
                  >
                    <i className="far fa-times-circle" />
                  </a>
                </span>
              </li>
            );
          })} */}
        </ul>
      </nav>
    </Fragment>
  );
};

export default Navigation;
