import React from 'react';
import './Header.css';

const Header = (props) => {
   return(
      <header>
         <div className="wrapper">
            <h1>Feedwatch</h1>
            <form action="submit" onSubmit={props.addQuery}>
               <input type="text"
                  placeholder="Add a query to watch for"
                  name="addQuery"
                  onChange={props.inputChange}
               />
               <button type="submit">Add Query</button>
            </form>
            <label htmlFor="navMenu">
               {/* <i className="fas fa-bars"></i> */}
               <div>Click HERE to edit your watch list</div>
            </label>
         </div>
      </header>
   )
}

export default Header;