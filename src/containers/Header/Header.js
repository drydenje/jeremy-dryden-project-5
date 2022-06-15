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
        <Navigation />
      </div>
    </header>
  );
};

export default Header;
