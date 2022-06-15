import React from "react";
import { Link } from "react-router-dom";
import AddQueryForm from "components/AddQueryForm";
import Navigation from "components/Navigation";
import "./Header.css";

const Header = () => {
  return (
    <header>
      <div className="wrapper">
        <h1>
          <Link to="/">Feedwatch 3</Link>
        </h1>
        <AddQueryForm />
        <label htmlFor="navMenu">
          {/* <i className="fas fa-bars"></i> */}
          <div>Click HERE to edit your watch list</div>
        </label>
        <Navigation />
      </div>
    </header>
  );
};

export default Header;
