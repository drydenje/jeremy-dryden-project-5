import React, { Fragment } from "react";
import "./Navigation.css";

const Navigation = props => {
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
          {props.searchTerms.map(item => {
            return (
              <li key={item.key}>
                {item.keyword}
                <span>
                  <a href="#0" onClick={() => props.removeQuery(item.key)}>
                    <i className="far fa-times-circle" />
                  </a>
                </span>
              </li>
            );
          })}
        </ul>
      </nav>
    </Fragment>
  );
};

export default Navigation;
