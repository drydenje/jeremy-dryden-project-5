import React from "react";
import { Link } from "react-router-dom";
// import { useSearchParams } from "react-router-dom";
import AddQueryForm from "../AddQueryForm/AddQueryForm";
import "./Header.css";

const Header = () => {
  // let [searchParams, setSearchParams] = useSearchParams();
  return (
    <header>
      <div className="wrapper">
        <h1>
          <Link to="/">Feedwatch 3</Link>
        </h1>
        <AddQueryForm />
        <label htmlFor="navMenu">
          {/* <i className="fas fa-bars"></i> */}
          {/* {console.log("S:", searchParams)} */}
          <div>Click HERE to edit your watch list</div>
        </label>
      </div>
    </header>
  );
};

export default Header;
