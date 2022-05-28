import React from "react";
import AddQueryForm from "../AddQueryForm/AddQueryForm";
import "./Header.css";

const Header = () => {
  return (
    <header>
      <div className="wrapper">
        <h1>Feedwatch 3</h1>
        <AddQueryForm />
        <label htmlFor="navMenu">
          {/* <i className="fas fa-bars"></i> */}
          <div>Click HERE to edit your watch list</div>
        </label>
      </div>
    </header>
  );
};

export default Header;
